import React, { useState } from 'react'
import { BaseModal } from '../BaseModal'
import s from './OrderModal.module.css'
import { changeImgPath } from '../../../utils/changeImgPath'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import { useActions, useAppSelector } from '../../../hooks'
import { orderThunks } from '../../../../features/order/order-slice'
import { OrderStatusType, ResponseGetUserOrderType } from '../../../../features/order/order-api'
import { orderAdminThunks } from '../../../../features/admin/orders-admin/orders-admin-slice'
import {
	OrderAdminItemsType,
	ResponseGetOrderAdminType
} from '../../../../features/admin/orders-admin/orders-admin-api'

export const OrderAdminModal: React.FC<Type> = ({ id, payment_method, status, date_created }) => {
	const { getOrder } = useActions(orderAdminThunks)
	const order = useAppSelector<ResponseGetOrderAdminType>(state => state.adminOrders.order)

	const [open, setOpen] = useState(false)
	const handleOpen = () => {
		getOrder(id)
			.unwrap()
			.then(res => setOpen(true))
		// setOpen(true)
	}
	const handleClose = () => setOpen(false)

	return (
		<BaseModal
			open={open}
			title={`Заказ номер ${id}`}
			button={<div className={s.details}> Подробнее </div>}
			handleClose={handleClose}
			handleOpen={handleOpen}
		>
			<div className={s.formWrapper}>
				<span>{`Заказчик: ${order.first_name} ${order.surname} ${order.last_name}`}</span>
				<span>{`Контакты: ${order.contact_phone}, ${order.contact_email}`}</span>
				<span>{`Адрес доставки: ${order.delivery_address}`}</span>
				<span>{`Статус заказа: ${status}`}</span>
				<span>{`Дата заказа: ${date_created}`}</span>
				<span>{`Способ оплаты: ${payment_method}`}</span>
				<span>{`Сумма заказа: ${order.total_cost} byn`}</span>

				{order.order_items?.map(el => {
					const image_path = changeImgPath(el.image_path)

					return (
						<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} key={el.name}>
							<ListItem>
								<ListItemAvatar>
									<Avatar src={image_path} alt={`${el.name} picture`} />
								</ListItemAvatar>
								<ListItemText
									primary={el.name}
									secondary={`стоимость: ${el.product_cost} byn, количество: ${el.quantity} шт.`}
								/>
							</ListItem>
						</List>
					)
				})}
			</div>
		</BaseModal>
	)
}

type Type = {
	id: number
	status: string
	date_created: string
	payment_method: string
}
