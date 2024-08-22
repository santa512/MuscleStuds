'use client'

import Link from 'next/link'
import { addToCart } from '@/store/index'
import { useRouter } from 'next/navigation'

export default function Button({
	text, 
	href = "", 
	onClick= function() {}, 
	type = '',
	price = 0,
	videoObject //id, title, sku, image_previews.find(Boolean), price 
}) {
	const router = useRouter()

	const handleDownload = () => {
		console.log(videoObject)
		if (videoObject) {
			addToCart(videoObject)
			router.push(`/cart?id=${videoObject.id}`)
		}
	}

	const buttonStyles = ''

	if (type === 'preview') {
		return (
			<Link href={href} className="text-lg flex flex-row gap-1 items-center rounded shadow border px-2 py-1 hover:shadow-lg transition bg-white" onClick={onClick}>
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16M9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664z" clipRule="evenodd"/></svg>
				<span className="text-sm">{text}</span>
			</Link>
		)
	}

	if (type === 'download') {
		return (
			<button onClick={() => handleDownload()} className="text-lg flex flex-row gap-1 items-center rounded shadow border px-2 py-1 hover:shadow-lg transition bg-white">
				<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg>
				<span className="text-sm">{text}</span>
				{price && <span className="text-xs">(${price})</span>}
			</button>
		)
	}

	if (href) {
		return (
			<Link className={buttonStyles}>{text}</Link>

		)
	}

	return(
		<button className={buttonStyles} onClick={onClick}>{text}</button>
	)
}