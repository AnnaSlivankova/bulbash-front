import { instance } from '../../app'
import { instanceUser } from '../../app/common-api'
import { CommonResponseType } from '../auth/auth-api'

export const userCartApi = {
	getCartItems() {
		return instanceUser.get<ResponseGetCartItemsType[]>('/api/v1/cart/get-items-from-cart').then(res => res.data)
	},
	addItemToCard(data: RequestAddItemType) {
		return instanceUser.post<ResponseAddItemType>('api/v1/cart/add-item-to-cart', data).then(res => res.data)
	},
	updateItemQuantity(data: RequestUpdateItemType) {
		return instanceUser.patch<CommonResponseType>('api/v1/cart/update-quantity-item-in-cart').then(res => res.data)
	},
	deleteCartItem(cart_id: number) {
		return instanceUser
			.delete<CommonResponseType>(`/api/v1/cart/delete-item-from-cart/${cart_id}`)
			.then(res => res.data)
	}
}

export type ResponseGetCartItemsType = {
	id: number
	user_uuid: string
	product_id: number
	quantity: number
	date_created: string
	date_updated: string
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
