import Link from 'next/link'
import Button from '@/components/commons/Button'

export default function VideoCard({
	id,
	slug,
	sku,
	title,
	image_previews,
	duration,
	summary,
	price
}) {
	return (
		<div className="flex flex-col w-[400px] space-y-2 shadow-lg border">
		  <div className="relative">
		    <Link href={`/video/${slug}`}><img alt={title} src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/assets/${image_previews?.find(Boolean)?.directus_files_id}`} className="w-full object-cover h-64 bg-gray-800" /></Link>
		    <p className="bg-black bg-opacity-30 text-white text-xs rounded-lg px-2 py-1 absolute left-4 bottom-4">HD</p>
		    <p className="bg-black bg-opacity-30 text-white text-xs rounded-lg px-2 py-1 absolute right-4 bottom-4">{duration}</p>
		  </div>
		  <div className="px-4 pb-4 pt-2">
		    <h3 className="text-lg text-center font-bold">{title}</h3>
		    <p>{summary}</p>
		    <div className="flex flex-row justify-center gap-4 mt-4">
		      <Button type="preview" href={`/video/${slug}`} text="Preview" />
		      <Button videoObject={{ id, title, sku, image: image_previews?.find(Boolean), price, summary }} type="download" text="Download" price={price.toFixed(2)} />
		    </div>
		  </div>
		</div>
	)
}