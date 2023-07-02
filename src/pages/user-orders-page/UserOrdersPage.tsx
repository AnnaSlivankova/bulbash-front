import React, { useEffect } from 'react'
import { useActions, useAppSelector } from '../../common/hooks'
import { orderThunks } from '../../features/order/order-slice'
import { OrderType } from '../../features/order/order-api'
import { TableComponent } from '../../common/components/table/Table'
import { userOrdersData } from '../../common/data/table-head-data'
import s from './UserOrdersPage.module.css'
import { InfoBlock } from '../../common/components/info-block/InfoBlock'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { _InfoBlock } from '../../common/components/info-block/test/_InfoBlock'
import { ButtonBack } from '../../common/components/button-back/ButtonBack'

export const UserOrdersPage = () => {
	const navigate = useNavigate()
	const orders = useAppSelector<OrderType[]>(state => state.order.orders)
	const { getAllUserOrders } = useActions(orderThunks)
	const params = {}

	const redirectToCart = () => {
		navigate('/cart')
	}

	useEffect(() => {
		getAllUserOrders(params)
	}, [])
	return (
		<>
			<_InfoBlock title={'bulbash food'} description={'catering'} type={'HomePage'}>
				{<ButtonBack callback={redirectToCart} />}
			</_InfoBlock>
			{/*<InfoBlock title={'bulbash food'} description={'catering'} type={'HomePage'}>*/}
			{/*	{*/}
			{/*		<Button onClick={redirectToCart} variant='contained' color='secondary'>*/}
			{/*			Назад*/}
			{/*		</Button>*/}
			{/*	}*/}
			{/*</InfoBlock>*/}

			<div className={s.wrapper}>
				<h3>Мои заказы</h3>
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
