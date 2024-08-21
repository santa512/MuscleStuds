import { convertDate } from "@/utils/functions";
import Link from "next/link";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getCatalogs() {
  try {
    const res = await fetch(`${baseURL}/items/Catalog`);
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

async function getVideosByCatalog(catalogId) {
  try {
    const res = await fetch(
      `${baseURL}/items/Video?filter[catalog][_eq]=${catalogId}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch videos");
    }

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getCatalogsWithVideos() {
  const catalogs = await getCatalogs();

  const catalogsWithVideos = await Promise.all(
    catalogs.map(async (catalog) => {
      const videos = await getVideosByCatalog(catalog.id);
      return {
        ...catalog,
        videos,
      };
    })
  );

  return catalogsWithVideos; // This will return an array of catalogs with their associated videos
}

export default async function Catalog() {
  const catalogs = await getCatalogsWithVideos();

  return (
    <div>
      <ul className="flex flex-col mx-4 px-4 py-5">
        {catalogs.map((catalog) => (
          <div
            key={catalog.id}
            className="text-center flex flex-row justify-center space-x-2 py-2"
          >
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold uppercase">
                    <Link href={`/catalogs/${catalog.id}`}>{catalog.name}</Link>
                  </h2>
                  <span className="text-sm font-extralight py-2">
                    {convertDate(catalog.date_created)}
                  </span>
                  <p>{catalog.description}</p>
                </div>
              </div>
              <div className="flex flex-row">
                {catalog.videos.map((video) => (
                  <div key={video.id} className="flex flex-col w-1/2 space-y-2 py-2">
                    <video className="w-full h-80 bg-gray-800" controls>
                      <source src={`${baseURL}/assets/${video.video_preview}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <h3 className="text-lg font-bold">{video.title}</h3>
                    <p>{video.description}</p>
                    <div className="flex flex-row space-x-4">
                      <Link href={`/video/${catalog.id}`}>
                        <button className="flex flex-1 bg-slate-300 w-1/3">
                          Preview
                        </button>
                      </Link>
                      <Link href={`/video/${catalog.id}`}>
                        <button className="flex flex-1 bg-slate-300 w-1/3">
                          Download
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
