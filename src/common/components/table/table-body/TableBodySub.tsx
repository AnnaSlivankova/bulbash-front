import React from 'react'

import IconButton from '@mui/material/IconButton'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { DeleteModal } from '../../modals/delete-modal/DeleteModal'
import { EditCatModal } from '../../modals/edit-modals/EditCatModal'

import s from './TableBody.module.css'
import { FetchCategoryResponseType } from '../../../../features/admin/admin-page-types'
import { useActions } from '../../../hooks'
import { adminCategoriesThunks } from '../../../../features/admin/categories/categories-admin-slice'
import { changeImgPath } from '../../../utils/changeImgPath'
import Checkbox from '@mui/material/Checkbox'
import {
	RequestPatchSubCategoryDataType,
	ResponseFetchSubcategoryType
} from '../../../../features/admin/subcategries/subcategories-admin-api'
import { EditSubModal } from '../../modals/edit-modals/EditSubModal'
import { adminSubcategoriesThunks } from '../../../../features/admin/subcategries/subcategories-admin-slice'
import { ResponseFetchProducts } from '../../../../features/admin/products/products-admin-api'
import { OrderType } from '../../../../features/order/order-api'
import { OrderAdminType } from '../../../../features/admin/orders-admin/orders-admin-api'
import { useMediaQuery, useTheme } from '@mui/material'

// const style = {
// 	tableRow: {
// 		'&:last-child td, &:last-child th': { border: 0 }
// 	}
// }

export const TableBodySubComponent: React.FC<Type> = ({ bodyData, deleteTitle, updateTitle }) => {
	const { updateSubcategory, deleteSubcategory } = useActions(adminSubcategoriesThunks)

	const onClickhandler = (subcategory_id: number, data: RequestPatchSubCategoryDataType) => {
		updateSubcategory({ subcategory_id, data })
	}

	const onClickDelete = (subcategory_id: number) => {
		deleteSubcategory(subcategory_id)
	}
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
	const style = {
		tableRow: {
			'&:last-child td, &:last-child th': { border: 0 }
		},
		cell: {
			fontSize: isSmallScreen ? 8 : 14,
			padding: isSmallScreen ? 0.5 : 2
		},
		btn: {
			height: isSmallScreen ? 20 : 40,
			width: isSmallScreen ? 20 : 40,
			// fontSize: isSmallScreen ? 10 : 18,
			padding: 0.5,
			margin: isSmallScreen ? 0 : 1
		}
	}

	return (
		<TableBody>
			{/*{bodyData.map((el: ResponseFetchSubcategoryType) => {*/}
			{bodyData.map((el: any) => {
				const formatedDateCreated = new Intl.DateTimeFormat(['ru']).format(new Date(el.date_created))
				const formatedDateUpdated = new Intl.DateTimeFormat(['ru']).format(new Date(el.date_updated))

				return (
					<TableRow key={el.id} sx={style.tableRow} hover>
						<TableCell className={s.nameCell} component='th' scope='row' sx={style.cell}>
							{/*{el.category_id}*/}
							{el.category_name}
						</TableCell>
						{/*<TableCell>{el.id}</TableCell>*/}
						<TableCell sx={style.cell}>{el.name}</TableCell>
						<TableCell sx={style.cell}>
							{el.status_enabled}
							<Checkbox color='secondary' checked={el.status_enabled} />
						</TableCell>
						<TableCell sx={style.cell}>{formatedDateCreated}</TableCell>
						<TableCell sx={style.cell}>{formatedDateUpdated}</TableCell>
						<TableCell>
							<div className={s.btnsWrapper}>
								<IconButton color='primary'>
									<EditSubModal
										id={el.id}
										prevName={el.name}
										title={`${updateTitle}: ${el.name}`}
										prevStatus={el.status_enabled}
										callback={onClickhandler}
										category_id={el.category_id}
									/>
								</IconButton>
								<IconButton color='primary'>
									<DeleteModal
										id={el.id}
										prevName={el.name}
										callback={() => onClickDelete(el.id)}
										deleteTitle={deleteTitle}
									/>
								</IconButton>
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
	deleteTitle: string
}
