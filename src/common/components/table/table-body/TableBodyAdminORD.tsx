import React from 'react'
import TableBody from '@mui/material/TableBody'
import { changePaymentMethodTitle } from '../../../utils/change-payment-method-title'
import { changeOrderStatusTitle } from '../../../utils/change-order-status-title'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import s from './TableBody.module.css'
import { FetchCategoryResponseType } from '../../../../features/admin/admin-page-types'
import { ResponseFetchSubcategoryType } from '../../../../features/admin/subcategries/subcategories-admin-api'
import { ResponseFetchProducts } from '../../../../features/admin/products/products-admin-api'
import { OrderType } from '../../../../features/order/order-api'
import { OrderAdminType, RequestUpdateOrderDataType } from '../../../../features/admin/orders-admin/orders-admin-api'
import { OrderAdminModal } from '../../modals/order-modal/OrderAdminModal'
import { EditOrderAdminModal } from '../../modals/order-modal/EditOrderAdminModal'
import { useActions } from '../../../hooks'
import { orderAdminThunks } from '../../../../features/admin/orders-admin/orders-admin-slice'

const style = {
	tableRow: {
		'&:last-child td, &:last-child th': { border: 0 }
	}
}

export const TableBodyAdminOrd: React.FC<Type> = ({ bodyData, updateTitle }) => {
	const { updateUserOrder } = useActions(orderAdminThunks)

	const updateUserOrderHandler = (data: RequestUpdateOrderDataType) => {
		updateUserOrder(data)
	}

	return (
		<TableBody>
			{bodyData.map((el: any) => {
				const formatedDateCreated = new Intl.DateTimeFormat(['ru']).format(new Date(el.date_created))
				const paymentMethod = changePaymentMethodTitle(el.payment_method)
				const orderStatus = changeOrderStatusTitle(el.status)

				return (
					<TableRow key={el.id} sx={style.tableRow} hover>
						<TableCell className={s.nameCell} component='th' scope='row'>
							{el.id}
						</TableCell>
						{/*<TableCell>{el.user_uuid}</TableCell>*/}
						<TableCell>{paymentMethod}</TableCell>
						<TableCell>{`${el.total_cost} byn`}</TableCell>
						<TableCell>{orderStatus}</TableCell>
						<TableCell>{formatedDateCreated}</TableCell>
						<TableCell>
							<div className={s.btnsWrapper}>
								<OrderAdminModal
									id={el.id}
									status={orderStatus}
									payment_method={paymentMethod}
									date_created={formatedDateCreated}
								/>
								<EditOrderAdminModal
									id={el.id}
									title={updateTitle}
									prev_payment_method={el.payment_method}
									prev_status={el.status}
									prev_total_cost={el.total_cost}
									callback={updateUserOrderHandler}
								/>
							</div>
						</TableCell>
					</TableRow>
				)
			})}
		</TableBody>
	)
}

type Type = {
	bodyData:
		| FetchCategoryResponseType[]
		| ResponseFetchSubcategoryType[]
		| ResponseFetchProducts[]
		| OrderType[]
		| OrderAdminType[]
	updateTitle: string
}
