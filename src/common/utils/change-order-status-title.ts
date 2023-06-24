import { OrderStatusType } from '../../features/order/order-api'

export const changeOrderStatusTitle = (status: string): string => {
	if (status === 'pending') {
		return 'В обработке'
	} else if (status === 'processing') {
		return 'Готовится'
	} else if (status === 'completed') {
		return 'Завершен'
	} else if (status === 'canceled') {
		return 'Отменен'
	} else {
		throw new Error('Status does not exist')
	}
}
