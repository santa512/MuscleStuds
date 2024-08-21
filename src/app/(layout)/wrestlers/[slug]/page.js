import VideoCard from '@/components/VideoCard'

async function getWrestler(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/items/Wrestler?filter[slug][_eq]=${slug}&limit=2&fields=*,Video.Video_id.*`, { next: { revalidate: 60 } }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch wrestlers");
    }
    const data = await res.json();
    console.log(data.data[0]);

    if (data.data.length) return data?.data[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = params;
  const wrestler = await getWrestler(slug);

  return {
    title: `${wrestler?.name} | Wrestler | Muscle Studs`,
    description: `${wrestler?.name} the wrestler`,
    revalidate: 86400,
  };
}

export default async function WrestlerPage({ params }) {
  const { slug } = params;
  const wrestler = await getWrestler(slug);


  return (
    <div>
      {/*<div id="fb-root"></div>*/}
{/*      <script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v16.0"
        nonce="yourNonce"
      ></script>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>*/}

      <h1 className="text-lg text-center py-5 uppercase tracking-tight">{wrestler.name}</h1>
      <div className="flex flex-row gap-8">
        <img
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/assets/${wrestler.primary_photo}`}
          className="h-72 object-fit"
          alt={wrestler.name}
        />
        <div>
          <h2 className="text-2xl mb-2 flex flex-row items-center gap-2.5">{wrestler.name} <span className="px-1.5 py-0.5 border rounded bg-gray-300 text-xs text-green-600 font-semibold">WS exclusive</span></h2>
          <p className="text-sm"><span className="font-bold">Weight: </span> {wrestler.weight}</p>
          <p className="text-sm"><span className="font-bold">Height: </span> {wrestler.height}</p>
        </div>
      </div>


      <div className="flex flex-row gap-4 mt-4">
        <a
          className="text-2xl"
          target="_blank"
          href={`https://www.facebook.com/sharer/sharer.php?&u=${process.env.NEXT_PUBLIC_FRONTEND_URL}/wrestlers/${wrestler.name}`}
          rel="noreferrer"
          data-layout="button"
          data-action="like"
          data-size="large"
          data-share="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="#1877f2" d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"/><path fill="#fff" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"/></svg>
        </a>
        <a
          target="_blank"
          href={`https://twitter.com/intent/tweet?text=Check out this wrestler!&url=${process.env.NEXT_PUBLIC_FRONTEND_URL}/wrestlers/${wrestler.name}`}
          className="text-2xl"
          data-size="large"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#fff" rx="60"/><rect width="256" height="256" fill="#1d9bf0" rx="60"/><path fill="#fff" d="M199.572 91.411c.11 1.587.11 3.174.11 4.776c0 48.797-37.148 105.075-105.075 105.075v-.03A104.54 104.54 0 0 1 38 184.677q4.379.525 8.79.533a74.15 74.15 0 0 0 45.865-15.839a36.98 36.98 0 0 1-34.501-25.645a36.8 36.8 0 0 0 16.672-.636c-17.228-3.481-29.623-18.618-29.623-36.198v-.468a36.7 36.7 0 0 0 16.76 4.622c-16.226-10.845-21.228-32.432-11.43-49.31a104.8 104.8 0 0 0 76.111 38.582a36.95 36.95 0 0 1 10.683-35.283c14.874-13.982 38.267-13.265 52.249 1.601a74.1 74.1 0 0 0 23.451-8.965a37.06 37.06 0 0 1-16.234 20.424A73.5 73.5 0 0 0 218 72.282a75 75 0 0 1-18.428 19.13"/></g></svg>
        </a>
      </div>

      <div className="my-12">
        <p className="mb-4 text-center text-lg uppercase tracking-tight">{wrestler.name} videos</p>
        {wrestler.Video.map(video => (
          <VideoCard key={video?.Video_id.id} {...video?.Video_id} />
        ))}
      </div>



    </div>
  );
}

export const revalidate = 86400;
