import Header from "@/components/nav/Header";
import Footer from "@/components/nav/Footer";
import Wrestlers from "@/components/Wrestlers";
import ScrollToTop from "@/components/commons/ScrollToTopButton";
import Link from 'next/link'
import { convertDate } from "@/utils/functions";
import VideoCard from '@/components/VideoCard'

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

//TODO: replace with actual home page video
async function getVideo() {
  try {
    const res = await fetch(
      `${baseURL}/items/Video`, { next: { revalidate: 60 } }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch video");
    }
    const data = await res.json();

    if (data.data.length) return data.data[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getMostRecentCatalog() {
  try {
    const res = await fetch(
      `${baseURL}/items/Catalog?limit=1&sort=-date_created`,
      { next: { revalidate: 60 }}
    );
    if (!res.ok) {
      throw new Error("Failed to fetch video");
    }
    const data = await res.json();
    return data?.data.find(Boolean)

  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getVideosByCatalog(catalogId) {
  try {
    const res = await fetch(`${baseURL}/items/Video?limit=18&filter[catalog][_eq]=${catalogId}&fields=*,image_previews.*`, { next: { revalidate: 60 } });

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

export default async function Home() {
  const homeVideo = await getVideo();
  const catalog = await getMostRecentCatalog(); 
  const videos = await getVideosByCatalog(catalog.id) || []

  return (
    <>
      <Header />
      <main className="min-h-screen container mx-auto mt-32">
        <div>
          <video className="w-full h-[70vh] bg-gray-800" controls>
            {/* Add your video source here */}
            <source
              src={`${baseURL}/assets/${homeVideo.video_preview}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex flex-row py-10 gap-6">
          <div className="hidden md:flex flex-col w-[350px] bg-secondary px-4">
            <Wrestlers />
          </div>

          <div className="w-full py-8 md:px-8 bg-secondary">
            <div className="mx-auto">
              <h2 className="text-2xl text-center font-bold uppercase tracking-tight text-gray-300"><Link href={`/catalogs/${catalog.slug}`}>{catalog.name}</Link></h2>
              <p className="mt-4 text-gray-400 text-center">{convertDate(catalog.date_created)}</p>
              <p className="mt-4 mb-12 text-gray-300">{catalog.description}</p>
            </div>
        
            {/* TODO: check responsiveness on larger screens */}
            <div className="mt-8 flex flex-wrap justify-between">
              {videos.map((video) => (<div key={video.id} className="md:w-[calc(32%)]"><VideoCard {...video} /></div>))}
            </div>
          </div>
        </div>
      </main>
      <ScrollToTop />
      <Footer />
    </>
  );
}
