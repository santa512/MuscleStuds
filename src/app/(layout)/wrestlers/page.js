import Link from "next/link";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

//https://gudev.nyc3.cdn.digitaloceanspaces.com/MuscleStuds/wrestlers.png
async function getWrestlers() {
  try {
    const res = await fetch(`${baseURL}/items/Wrestler?limit=128`, { next: { revalidate: 60 } });
    if (!res.ok) {
      throw new Error("Failed to fetch wrestlers");
    }
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const metadata = {
  title: "Wrestlers | Muscle Studs",
  description: "...",
};

export default async function WrestlersPage() {
  const wrestlers = await getWrestlers();

  console.log(wrestlers)

  return (
    <div className="bg-secondary p-4">
      <h1 className="text-2xl text-center py-3 uppercase text-gray-400 mb-6">Wrestlers</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {wrestlers.map((wrestler) => (
          <Link
            key={wrestler.id}
            className="shadow text-center w-full bg-neutral-900"
            href={`/wrestlers/${wrestler.slug}`}
          >
            <img
              src={`${baseURL}/assets/${wrestler.primary_photo}`}
              className="h-72 w-full object-cover object-top"
              alt={wrestler.name}
            />
            <div className="p-4 my-4">
              <p className="text-lg text-gray-400">{wrestler.name}</p>
              <p className="text-gray-500">{wrestler.Video?.length} videos</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
