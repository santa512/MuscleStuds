/*

const stripe = require('stripe')('sk_test_51MQiXrLK5IpDvi96RF0F1QogMjCQxlZohfN7qvfl2hxuGC3clu8TxTorGtV3m9GWEEO791gCwkfQBBxzaAK7tGLX00h1UUjonN');

app.get('/order/success', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);

  res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
});


*/

export default async function CartPage({
	searchParams
}) {

	//TODO: get success checkout session info

	return (
		<div>TODO: cart page</div>
	)
}
