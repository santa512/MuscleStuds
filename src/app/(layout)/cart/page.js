import dynamic from 'next/dynamic';
const CartViewer = dynamic(() => import('@/components/CartViewer'), { ssr: false });

export default function CartPage() {

  return (<div>
    <CartViewer />
  </div>)
}
