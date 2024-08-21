import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(req) {
  const { items } = await req.json();

  const format = items.map(item => {
    const imageLink = `${process.env.NEXT_PUBLIC_API_BASE_URL}/assets/${item.image?.directus_files_id}`
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          description: item.summary,
          images: item.image?.directus_files_id ? [imageLink] : []
        },
        unit_amount: (item.price * 100)
      },
      quantity: 1
    }
  })

  try {
    const session = await stripe.checkout.sessions.create({
       payment_method_types: ['card'],
       line_items: format,
       mode: 'payment',
       success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/thanks?session_id={CHECKOUT_SESSION_ID}"`,
       cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/cart`,
     });

    console.log(session)

    return NextResponse.json({ id: session.id });
  } catch (err) {
    // console.log({ err });
    console.log(err)
    console.log(err.errors)
    return NextResponse.json(
      { message: "An expected error occurred, please try again" },
      { status: 500 }
    );
  }
}