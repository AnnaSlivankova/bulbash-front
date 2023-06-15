import { instance } from '../../app'
import { instanceUser } from '../../app/common-api'
import { CommonResponseType } from '../auth/auth-api'

export const userCartApi = {
	getCartItems() {
		return instanceUser.get<ResponseGetCartItemsType>('/api/v1/cart/get-items-from-cart').then(res => res.data)
	},
	addItemToCard(data: RequestAddItemType) {
		return instanceUser.post<ResponseAddItemType>('api/v1/cart/add-item-to-cart', data).then(res => res.data)
	},
	updateItemQuantity(data: RequestUpdateItemType) {
		return instanceUser
			.patch<CommonResponseType>('api/v1/cart/update-quantity-item-in-cart', data)
			.then(res => res.data)
	},
	deleteCartItem(cart_id: number) {
		return instanceUser
			.delete<CommonResponseType>(`/api/v1/cart/delete-item-from-cart/${cart_id}`)
			.then(res => res.data)
	}
}

export type ResponseGetCartItemsType = {
	data: CartItemType[]
	total_price: number
}
export type CartItemType = {
	id: number
	user_uuid: string
	product_id: number
	name: string
	description: string
	weight: number
	price: number
	image_path: string
	quantity: number
	product_price: number
}

export type RequestAddItemType = {
	product_id: number
	quantity: number
}

export type ResponseAddItemType = {
	id: number
	product_id: number
	quantity: number
	user_uuid: string
}

export type RequestUpdateItemType = {
	id: number
	quantity: number
}
export type ResponseUpdateItemType = {}
