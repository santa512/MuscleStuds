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
    <div>
      <h2 className="text-xl text-center py-5 uppercase">Wrestlers</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {wrestlers.map((wrestler) => (
          <Link
            key={wrestler.id}
            className="shadow border text-center w-full"
            href={`/wrestlers/${wrestler.slug}`}
          >
            <img
              src={`${baseURL}/assets/${wrestler.primary_photo}`}
              className="h-72 w-full object-cover object-top"
              alt={wrestler.name}
            />
            <div className="p-4">
              <p className="text-xl font-semibold">{wrestler.name}</p>
              <p>{wrestler.Video?.length} videos</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
