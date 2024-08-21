'use client'

import { useStore } from '@nanostores/react'
import { $cart, setCart, removeFromCart } from '@/store/index'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Spinner from '@/components/commons/Spinner'

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CartViewer() {


	const AlertBar = ({ cart }) => {
		const searchParams = useSearchParams()
		const id = searchParams.get('id')
		const addedTitle = cart.items.find(item => item.id == id)?.title

		if ((id && cart.items.length > 0)) {
			return (
				<div className="bg-green-200 text-green-800 p-4 mb-5 text-center">
				  Video download &quot;{addedTitle}&quot; added to your shopping cart.
				</div>

			)
		}
		return <div></div>
	}


	const router = useRouter()

	const cart = useStore($cart);

	const [loadingCheckout, setLoadingCheckout] = useState(false)

	const handleCheckout = async () => {

		setLoadingCheckout(true)
	  const stripe = await stripePromise;
	  const response = await fetch('/api/stripe-checkout-session', {
	    method: 'POST',
	    body: JSON.stringify({
	    	items: cart.items
	    })
	  });
	  const session = await response.json();
	  await stripe.redirectToCheckout({ sessionId: session.id });
	  setLoadingCheckout(false)
	}

	const subtotal = cart.items.reduce((acc, item) => acc + item.price, 0);
	const total = subtotal;


	return(
		<div className="min-h-screen bg-gray-50">
		  <div className="container mx-auto">
		    <h2 className="text-2xl text-center py-10 uppercase tracking-tight">Shopping Cart</h2>

		    <Suspense>
		   		<AlertBar cart={cart} />
		    </Suspense>

		    {cart.items.length === 0 &&
		      <p className="text-center italic">No items in cart.</p>
		    }
		    {cart.items.length > 0 &&
		    <div>
		      <table className="w-full text-left">
		        <thead>
		          <tr>
		            <th className="px-4 py-2">Image</th>
		            <th className="px-4 py-2">Title</th>
		            <th className="px-4 py-2">SKU</th>
		            <th className="px-4 py-2">Subtotal</th>
		            <th className=" text-center">Remove</th>
		          </tr>
		        </thead>
		        <tbody>
		          {cart.items.map((item, index) => (
		            <tr
		              key={item.id}
		              className={`border-t border-gray-600`}
		            >
		              <td className="px-4 py-2">
		                <img
		                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/assets/${item.image?.directus_files_id}`}
		                  alt={item.title}
		                  width={80}
		                  height={80}
		                  className="object-cover"
		                />
		              </td>
		              <td className="px-4 py-2">{item.title}</td>
		              <td className="px-4 py-2">{item.sku}</td>
		              <td className="px-4 py-2">${item.price.toFixed(2)}</td>
		              <td className="px-4 py-2 text-center">
		                <button onClick={() => { removeFromCart(item); router.push('/cart') }} className="text-red-500">✕</button>
		              </td>
		            </tr>
		          ))}
		        </tbody>
		      </table>

		      <div className="text-right mt-6 mr-4">
		        <p>Subtotal: ${subtotal.toFixed(2)}</p>
		        <p><b>Total: ${total.toFixed(2)}</b></p>
		      </div>

		    </div>
		    }

		    <div className="flex justify-center mt-10 space-x-4">
		      <Link href="/" className="bg-white border shadow py-2 px-6 rounded">Shop More</Link>
		      {cart.items.length > 0 && <button onClick={() => setCart({ items: [] })} className="bg-white border shadow py-2 px-6 rounded">Clear Cart</button>}
		      {cart.items.length > 0 && 
		      	<button onClick={() => handleCheckout()} className="bg-blue-500 border text-white py-2 px-6 rounded">
		      		{loadingCheckout 
		      			? <div className="mx-auto"><Spinner /></div> 
		      			: 'Checkout' 
		      		}
		      	</button>
		      }
		    </div>
		  </div>
		</div>
	)
}