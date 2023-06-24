import React, { useEffect, useState } from 'react'
import { useActions, useAppSelector } from '../../../hooks'
import { orderThunks } from '../../../../features/order/order-slice'
import { BaseModal } from '../BaseModal'
import List from '@mui/material/List'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItem from '@mui/material/ListItem'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import { ResponseGetUserOrderType } from '../../../../features/order/order-api'
import { changeImgPath } from '../../../utils/changeImgPath'
import s from './OrderModal.module.css'

export const OrderUserModal: React.FC<Type> = ({ id }) => {
	const { getUserOrder } = useActions(orderThunks)
	const order = useAppSelector<ResponseGetUserOrderType>(state => state.order.order)

	const [open, setOpen] = useState(false)
	const handleOpen = () => {
		getUserOrder(id)
			.unwrap()
			.then(res => setOpen(true))
		// setOpen(true)
	}
	const handleClose = () => setOpen(false)

	return (
		<BaseModal
			open={open}
			title={`Заказ номер ${id}`}
			button={<div> Подробнее </div>}
			handleClose={handleClose}
			handleOpen={handleOpen}
		>
			<div className={s.formWrapper}>
				<span>{`Заказчик: ${order.first_name} ${order.surname} ${order.last_name}`}</span>
				<span>{`Контакты: ${order.contact_phone}, ${order.contact_email}`}</span>
				<span>{`Адрес доставки: ${order.delivery_address}`}</span>
				{/*<span>{`Статус заказа: ${order.status}`}</span>*/}
				{/*<span>{`Дата заказа: ${order.date_created}`}</span>*/}
				{/*<span>{`Способ оплаты: ${order.payment_method}`}</span>*/}
				{/*<span>{`Сумма заказа: ${order.total_cost} byn`}</span>*/}

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
}
