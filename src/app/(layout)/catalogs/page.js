import { convertDate } from "@/utils/functions";
import Link from "next/link";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

//https://gudev.nyc3.cdn.digitaloceanspaces.com/MuscleStuds/catalog.png

async function getCatalogs() {
  try {
    const res = await fetch(`${baseURL}/items/Catalog?limit=9`, { next: { revalidate: 60 } });
    if (!res.ok) {
      throw new Error("Failed to fetch Catalogs");
    }
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const metadata = {
  title: "Catalogs | Muscle Studs",
  description: "..."
};

export default async function CatalogsPage() {
  const catalogs = await getCatalogs();

  return (
    <div className="bg-secondary p-4">
      <h2 className="text-2xl text-center py-5 uppercase text-gray-400">Catalogs</h2>

      {catalogs.map((catalog) => (
        <Link key={catalog.id} href={`/catalogs/${catalog.slug}`}>
          <div className="my-8 flex flex-col md:flex-row gap-4 border-b md:border-none pb-4">
            <img
              className="w-full md:w-80 h-64 object-cover blur-md"
              src={`${baseURL}/assets/${catalog.image_preview}`}
              alt={catalog.name}
            />

            <div className="flex flex-col ">
              <h2 className="text-xl font-bold text-gray-300">{catalog.name}</h2>
              <span className="text-sm font-extralight py-2 text-gray-500">{convertDate(catalog.date_created)} {catalog.videos?.length > 0 ? `, ${catalog.videos.length} videos` : ''}</span>
              <p className="text-gray-300">{catalog.description}</p>
            </div>
          </div>
        </Link>
      ))}
     
    </div>
  );
}
