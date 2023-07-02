import React from 'react'
import { FetchCategoryResponseType } from '../../../../features/admin/admin-page-types'
import { ResponseFetchSubcategoryType } from '../../../../features/admin/subcategries/subcategories-admin-api'
import { ResponseFetchProducts } from '../../../../features/admin/products/products-admin-api'
import { OrderType } from '../../../../features/order/order-api'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import s from './TableBody.module.css'
import { OrderUserModal } from '../../modals/order-modal/OrderUserModal'
import { changePaymentMethodTitle } from 'common/utils/change-payment-method-title'
import { changeOrderStatusTitle } from '../../../utils/change-order-status-title'
import { OrderAdminType } from '../../../../features/admin/orders-admin/orders-admin-api'
import { useMediaQuery, useTheme } from '@mui/material'

// const style = {
// 	tableRow: {
// 		'&:last-child td, &:last-child th': { border: 0 }
// 	}
// }

export const TableBodyUserOrd: React.FC<Type> = ({ bodyData }) => {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
	const style = {
		tableRow: {
			'&:last-child td, &:last-child th': { border: 0 }
		},
		cell: {
			fontSize: isSmallScreen ? 8 : 14,
			padding: isSmallScreen ? 0.5 : 2
		}
	}

	return (
		<TableBody>
			{bodyData.map((el: any) => {
				const formatedDateCreated = new Intl.DateTimeFormat(['ru']).format(new Date(el.date_created))
				const paymentMethod = changePaymentMethodTitle(el.payment_method)
				const orderStatus = changeOrderStatusTitle(el.status)

				return (
					<TableRow key={el.id} sx={style.tableRow} hover>
						<TableCell className={s.nameCell} component='th' scope='row' sx={style.cell}>
							{el.id}
						</TableCell>
						<TableCell sx={style.cell}>{paymentMethod}</TableCell>
						<TableCell sx={style.cell}>{`${el.total_cost} byn`}</TableCell>
						<TableCell sx={style.cell}>{orderStatus}</TableCell>
						<TableCell sx={style.cell}>{formatedDateCreated}</TableCell>
						<TableCell sx={style.cell}>
							<OrderUserModal id={el.id} />
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
}
