import { instance } from '../../app'
import { instanceUser } from '../../app/common-api'
import { CommonResponseType } from '../auth/auth-api'

export const cartApi = {
	addItemToCard(data: RequestAddItemType) {
		return instanceUser.post<CommonResponseType>('api/v1/cart/add-item-to-cart', data).then(res => res.data)
	}
}
export type RequestAddItemType = {
	product_id: number
	quantity: number
}
