import { convertDate } from "@/utils/functions";
import Link from 'next/link'
import Button from '@/components/commons/Button';
import VideoCard from '@/components/VideoCard'

async function getCatalog(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/items/Catalog?filter=[slug][_eq]=${slug}limit=1`,
      { next: { revalidate: 60 }}
    );
    if (!res.ok) {
      throw new Error("Failed to fetch video");
    }
    const data = await res.json();

    console.log(data)
    return data?.data.find(Boolean)

  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getVideosByCatalog(catalogId) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/items/Video?limit=16&filter[catalog][_eq]=${catalogId}&fields=*,image_previews.*`, { next: { revalidate: 60 } });

    if (!res.ok) {
      throw new Error("Failed to fetch videos");
    }

    const data = await res.json();
    return data?.data || []
  } catch (err) {
    console.error(err);
    return [];
  }
}

export const metadata = {
  title: "Catalogs | Muscle Studs",
  description: "..."
};

export default async function CatalogPage({ params }) {

	const catalog = await getCatalog(params.slug)
	const videos = await getVideosByCatalog(catalog.id)


	return (
		<div className="w-full py-4 px-4 md:px-0">

		  <div className="mx-auto">
		    <h2 className="text-2xl text-center font-bold uppercase tracking-tight"><Link href={`/catalog/${catalog.id}`}>{catalog.name}</Link></h2>
		    <p className="mt-4 text-gray-400 text-center">{convertDate(catalog.date_created)}</p>
		    <p className="mt-4 mb-12">{catalog.description}</p>
		  </div>

		             
		  {/* TODO: check responsiveness on larger screens */}
		  <div className="mt-8 flex flex-col md:flex-row items-center md:items-start max-w-5xl gap-4">
		    {videos.map((video) => (<VideoCard {...video} key={video.id} />))}
		  </div>
		
		
		</div>
	)
}
