import Link from "next/link";
import Image from 'next/image';
import Button from '@/components/commons/Button';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getCatalog(slug) {
	try {
		const res = await fetch(`${baseURL}/items/Catalog/${slug}`, { next: { revalidate: 60 } });
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

async function getVideoBySlug(slug) {
	try {
    const res = await fetch(
      `http://142.93.112.151/items/Video?filter[slug][_eq]=${slug}`, { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch videos");
    }

    const data = await res.json();
    return data.data;
  } catch (err) {
		console.log("error founded")
    console.error(err);
    return [];
  }
}

export const metadata = {
	title: "TODO: video title | Muscle Studs",
	description: "...",
}

export default async function VideoPage({ params }) {
	const { slug } = params;
	const video = await getVideoBySlug(slug);
	const catalog = await getCatalog(video[0].catalog);
	return (
		<div className="min-h-screen bg-secondary p-4">
			{video[0]?.title && (
				<h2 className="text-xl text-center pt-5 uppercase text-gray-300">{video[0].title}</h2>
			)}
			<h3 className="text-xl text-center py-5 uppercase text-gray-300">{catalog.name}</h3>
			<video className="w-full bg-gray-800" controls>
				<source src={`${baseURL}/assets/${video[0].video_preview}`} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<p className="text-gray-300 px-2 my-8">
				{video[0].description ? video[0].description : "Lorem Ipsum is simply dummy text of the printing and typesetting since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
			</p>
			{/* <button className="flex flex-1 bg-slate-300 w-1/3">
				<Link href={`/product/${catalog.id}`}>
					Download
				</Link>
			</button> */}
			<Button downloadId={video[0].id} type="download" text="Download Full Video" price={video[0].price.toFixed(2)} />
			<div className="grid grid-cols-3 gap-4 my-8 ">
          <Image src={`${baseURL}/assets/${video[0].image_previews}`} alt="Wrestler 1" width={300} height={200} className="object-cover"/>
          <Image src="/wrestler.jpg" alt="Wrestler 2" width={300} height={200} className="object-cover"/>
          <Image src="/wrestler.jpg" alt="Wrestler 3" width={300} height={200} className="object-cover"/>
          <Image src="/wrestler.jpg" alt="Wrestler 4" width={300} height={200} className="object-cover"/>
          <Image src="/wrestler.jpg" alt="Wrestler 5" width={300} height={200} className="object-cover"/>
          <Image src="/wrestler.jpg" alt="Wrestler 6" width={300} height={200} className="object-cover"/>
			</div>
		</div>
	)
}


/*
const VideoPage = () => {
  return (
    <div className="bg-gray-800 min-h-screen text-white">
      <div className="container mx-auto py-10">
        <h2 className="text-center text-3xl font-bold mb-2">MONSTAH MIKE VS JACK BAILEY</h2>
        <p className="text-center text-gray-400 mb-6">Catalog 50: Animal Instinct</p>

        <div className="bg-gray-700 rounded-lg overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 bg-gray-900">
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">LARGE VIDEO PLAYER HERE (use any default video for now)</p>
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-800 p-4 mt-4">
            <span className="text-sm">00:00</span>
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-gray-600 rounded">⏮️</button>
              <button className="p-2 bg-gray-600 rounded">⏸️</button>
              <button className="p-2 bg-gray-600 rounded">▶️</button>
              <button className="p-2 bg-gray-600 rounded">⏭️</button>
            </div>
            <span className="text-sm">00:36</span>
          </div>
        </div>

        <p className="text-gray-400 mt-6">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...
        </p>

        <div className="mt-6 flex justify-center">
          <button className="bg-gray-600 text-white py-3 px-6 rounded">Download Full Video ($33.99)</button>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <Image src="/images/wrestler1.jpg" alt="Wrestler 1" width={300} height={200} className="object-cover"/>
          <Image src="/images/wrestler2.jpg" alt="Wrestler 2" width={300} height={200} className="object-cover"/>
          <Image src="/images/wrestler3.jpg" alt="Wrestler 3" width={300} height={200} className="object-cover"/>
          <Image src="/images/wrestler4.jpg" alt="Wrestler 4" width={300} height={200} className="object-cover"/>
          <Image src="/images/wrestler5.jpg" alt="Wrestler 5" width={300} height={200} className="object-cover"/>
          <Image src="/images/wrestler6.jpg" alt="Wrestler 6" width={300} height={200} className="object-cover"/>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
*/

