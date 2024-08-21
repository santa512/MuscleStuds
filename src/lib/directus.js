/* https://docs.directus.io/reference/items.html */
import { createDirectus } from '@directus/sdk';

import { 
	setCart  
} from '@/store/index'

//TODO: change to .env
export const directus = createDirectus(
	'http://142.93.112.151'
)
.with(rest({
	onRequest: (options) => ({ ...options, cache: 'no-store' }),
}))


//TODO: add directus objects
export const OBJECTS = {}