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

const style = {
	tableRow: {
		'&:last-child td, &:last-child th': { border: 0 }
	}
}

export const TableBodySubComponent: React.FC<Type> = ({ bodyData, deleteTitle, updateTitle }) => {
	const { updateSubcategory, deleteSubcategory } = useActions(adminSubcategoriesThunks)

	const onClickhandler = (subcategory_id: number, data: RequestPatchSubCategoryDataType) => {
		updateSubcategory({ subcategory_id, data })
	}

	const onClickDelete = (subcategory_id: number) => {
		deleteSubcategory(subcategory_id)
	}

	return (
		<TableBody>
			{/*{bodyData.map((el: ResponseFetchSubcategoryType) => {*/}
			{bodyData.map((el: any) => {
				const formatedDateCreated = new Intl.DateTimeFormat(['ru']).format(new Date(el.date_created))
				const formatedDateUpdated = new Intl.DateTimeFormat(['ru']).format(new Date(el.date_updated))

				return (
					<TableRow key={el.id} sx={style.tableRow} hover>
						<TableCell className={s.nameCell} component='th' scope='row'>
							{/*{el.category_id}*/}
							{el.category_name}
						</TableCell>
						{/*<TableCell>{el.id}</TableCell>*/}
						<TableCell>{el.name}</TableCell>
						<TableCell>
							{el.status_enabled}
							<Checkbox color='secondary' checked={el.status_enabled} />
						</TableCell>
						<TableCell>{formatedDateCreated}</TableCell>
						<TableCell>{formatedDateUpdated}</TableCell>
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
