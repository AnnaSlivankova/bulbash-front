import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import { useSearchParams } from 'react-router-dom'
import { useActions } from '../../../../common/hooks'
import { orderAdminThunks } from '../orders-admin-slice'
import { paymentMethodData } from '../../../../common/data/payment-method-data'
import { statusOrderData } from '../../../../common/data/status-order-data'
import { SelectFilterStr } from '../../../../common/components/select-filter/SelectFilterStr'
import s from './OrdersFilter.module.css'

export const OrdersFilter = () => {
	const { getAllOrders } = useActions(orderAdminThunks)

	const [searchParams, setSearchParams] = useSearchParams()

	const searchByPaymentMethod = (payment_method: string) => {
		setSearchParams({ ...Object.fromEntries(searchParams), payment_method: payment_method.toString() })
	}

	const searchByStatus = (status: string) => {
		setSearchParams({ ...Object.fromEntries(searchParams), status: status.toString() })
	}

	const resetFilterHandler = () => {
		;['payment_method', 'status'].forEach(el => searchParams.delete(el))
		setSearchParams({
			...Object.fromEntries(searchParams)
		})
	}

	useEffect(() => {
		getAllOrders({ ...Object.fromEntries(searchParams) })
	}, [searchParams])

	return (
		<div className={s.wrapper}>
			<SelectFilterStr data={paymentMethodData} title={'метод оплаты'} callback={searchByPaymentMethod} />
			<SelectFilterStr data={statusOrderData} title={'статус заказа'} callback={searchByStatus} />
			<Button onClick={resetFilterHandler} color='error'>
				reset
			</Button>
		</div>
	)
}
