import { persistentAtom } from '@nanostores/persistent'
import { atom } from 'nanostores'

export const $cart = persistentAtom('cart', {
	items: []
}, {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function setCart(json) {
	$cart.set(json);
}

export function addToCart(item) {
	const currentCart = $cart.get();

	if (currentCart.items.some(thing => thing.id == item.id)) {
		return
	}

	const currentItems = currentCart.items.concat([item])

	$cart.set({
		...currentCart,
		items: currentItems
	})
}

export function removeFromCart(item) {
	const currentCart = $cart.get();
	const currentItems = currentCart.items
	const indexOf = currentItems.indexOf(item)

	if (indexOf == -1) {
		return
	}

	currentItems.splice(indexOf, 1)

	$cart.set({
		...currentCart,
		items: currentItems
	})
}