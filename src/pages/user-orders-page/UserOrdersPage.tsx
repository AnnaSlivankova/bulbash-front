import React, { useEffect } from 'react'
import { useActions, useAppSelector } from '../../common/hooks'
import { orderThunks } from '../../features/order/order-slice'
import { OrderType } from '../../features/order/order-api'
import { TableComponent } from '../../common/components/table/Table'
import { userOrdersData } from '../../common/data/table-head-data'
import s from './UserOrdersPage.module.css'
import { InfoBlock } from '../../common/components/info-block/InfoBlock'

export const UserOrdersPage = () => {
	const orders = useAppSelector<OrderType[]>(state => state.order.orders)
	const { getAllUserOrders } = useActions(orderThunks)
	const params = {}

	useEffect(() => {
		getAllUserOrders(params)
	}, [])
	return (
		<>
			<InfoBlock title={'bulbash food'} description={'catering'} type={'HomePage'}>
				{/*{<Button onClick={redirectToCategories}>Назад</Button>}*/}
			</InfoBlock>

			<div className={s.wrapper}>
				<h2>Мои заказы</h2>
				<TableComponent
					type='UORD'
					headData={userOrdersData}
					bodyData={orders}
					sort={''}
					deleteTitle=''
					updateTitle=''
				/>
			</div>
		</>
	)
}
