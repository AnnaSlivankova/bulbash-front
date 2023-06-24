import React, { useEffect } from 'react'
import { useActions, useAppSelector } from '../../../common/hooks'
import { orderAdminThunks } from './orders-admin-slice'
import { TableComponent } from '../../../common/components/table/Table'
import { adminOrdersData } from '../../../common/data/table-head-data'
import { OrderAdminType } from './orders-admin-api'

export const OrdersAdmin = () => {
	const orders = useAppSelector<OrderAdminType[]>(state => state.adminOrders.orders)
	const { getAllOrders, getOrder } = useActions(orderAdminThunks)
	const params = {}

	useEffect(() => {
		getAllOrders(params)
	}, [])

	return (
		<TableComponent
			type={'AORD'}
			headData={adminOrdersData}
			bodyData={orders}
			updateTitle={'Изменить статус заказа'}
			deleteTitle={''}
			sort={''}
		/>
	)
}
