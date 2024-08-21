import Link from "next/link";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getWrestlers() {
    try {
      const res = await fetch(`${baseURL}/items/Wrestler`);
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  
  export default async function Wrestlers() {
    const wrestlers = await getWrestlers();
   
    return (
      <div>
        <h2 className="text-xl tracking-tight text-center py-5 uppercase">Our Wrestlers</h2>
        <ul className="">
          {wrestlers.length > 0 ? (
            wrestlers.map((wrestler) => (
                <li key={wrestler.id} className="border-b border-black pt-4 pb-2 list-none text-sm">
                    <Link href={`/wrestlers/${wrestler.slug}`} className="w-full text-left uppercase block">
                        {wrestler.name}
                    </Link>
                </li>
            ))
          ) : (
            <li>No wrestlers found.</li>
          )}
        </ul>
      </div>
    );
  }