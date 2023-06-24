import { PaymentMethodType } from '../../features/order/order-api'

export const changePaymentMethodTitle = (payment_method: string): string => {
	if (payment_method === 'card') {
		return 'Банковская карта'
	} else if (payment_method === 'cash') {
		return 'Наличные'
	} else {
		throw new Error('Payment method does not exist')
	}
}
