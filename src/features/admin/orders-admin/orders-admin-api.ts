import { instanceUser } from '../../../app/common-api'
import { GetAllOrdersParamsType, OrderStatusType, PaymentMethodType } from '../../order/order-api'

export const orderAdminApi = {
	getAllOrders(params: Partial<GetAllOrdersAdminParamsType>) {
		return instanceUser
			.get<ResponseGetAllOrdersType>('/api/v1/bulbash_admin/get-all-orders', {
				params,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			.then(res => res.data)
	},
	getOrder(order_id: number) {
		return instanceUser
			.get<ResponseGetOrderAdminType>(`/api/v1/bulbash_admin/get-order/${order_id}`)
			.then(res => res.data)
	},
	updateOrderStatus(data: RequestUpdateOrderDataType) {
		return instanceUser.post<any>('/api/v1/bulbash_admin/update-status-order', data).then(res => res.data)
	}
}

export type GetAllOrdersAdminParamsType = GetAllOrdersParamsType & {
	user_uuid: string
	contact_phone: string
}
export type RequestUpdateOrderDataType = {
	order_id: number
	payment_method: string
	total_cost: number
	status: string
}
export type ResponseGetAllOrdersType = {
	data: OrderAdminType[]
}

export type OrderAdminType = {
	id: number
	user_uuid: string
	payment_method: string
	total_cost: number
	status: string
	date_created: string
}

export type ResponseGetOrderAdminType = {
	id: number
	user_uuid: string
	first_name: string
	last_name: string
	surname: string
	contact_phone: string
	contact_email: string
	delivery_address: string
	payment_method: string
	total_cost: number
	status: string
	date_created: string
	order_items: OrderAdminItemsType[]
}
export type OrderAdminItemsType = {
	name: string
	description: string
	image_path: string
	quantity: number
	product_cost: number
}
