import { instanceUser } from '../../app/common-api'

export const orderApi = {
	createNewOrder(data: RequestNewOrderType) {
		return instanceUser.post<any>('api/v1/order/create-new-order', data).then(res => res.data)
	},
	getAllUserOrders(params: Partial<GetAllOrdersParamsType>) {
		return instanceUser.get<ResponseGetAllOrders>('/api/v1/order/get-all-user-orders', { params }).then(res => res.data)
	},
	getUserOrder(order_id: number) {
		return instanceUser.get<ResponseGetUserOrderType>(`/api/v1/order/get-user-orders/${order_id}`).then(res => res.data)
	}
}

export type RequestNewOrderType = {
	first_name: string
	last_name: string
	surname: string
	contact_phone: string
	contact_email: string
	delivery_address?: string | null
	payment_method: PaymentMethodType
	total_cost: number
	product_list: ProductListType[]
}
export type ProductListType = {
	cart_id: number
	product_id: number
	quantity: number
	product_cost: number
}
export type GetAllOrdersParamsType = {
	payment_method: PaymentMethodType
	total_cost_min: number
	total_cost_max: number
	status: OrderStatusType

	min_order_date: string
	max_order_date: string
}
export type PaymentMethodType = 'card' | 'cash'
export type OrderStatusType = 'pending' | 'processing' | 'completed' | 'canceled'

export type ResponseGetAllOrders = {
	data: OrderType[]
}
export type OrderType = {
	id: number
	payment_method: string
	total_cost: number
	status: string
	date_created: string
}

export type ResponseGetUserOrderType = {
	id: number
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
	order_items: OrderItemsType[]
}
export type OrderItemsType = {
	name: string
	description: string
	image_path: string
	quantity: number
	product_cost: number
}
