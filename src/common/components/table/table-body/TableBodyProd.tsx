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
import { ResponseFetchSubcategoryType } from '../../../../features/admin/subcategries/subcategories-admin-api'
import { adminProductsThunks } from '../../../../features/admin/products/products-admin-slice'
import { ResponseFetchProducts } from '../../../../features/admin/products/products-admin-api'
import { EditProdModal } from '../../modals/edit-modals/EditProdModal'
import { OrderType } from '../../../../features/order/order-api'
import { OrderAdminType } from '../../../../features/admin/orders-admin/orders-admin-api'
import { useMediaQuery, useTheme } from '@mui/material'

const style = {
	tableRow: {
		'&:last-child td, &:last-child th': { border: 0 }
	}
}

export const TableBodyProdComponent: React.FC<Type> = ({ bodyData, deleteTitle, updateTitle }) => {
	const { updateProduct, deleteProduct } = useActions(adminProductsThunks)

	const onClickhandler = (product_id: number, params: any, img_file: FormData) => {
		updateProduct({ product_id, params, img_file })
	}

	const onClickDelete = (product_id: number) => {
		deleteProduct(product_id)
	}
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
	// const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
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
			{/*{bodyData.map((el: FetchCategoryResponseType) => {*/}
			{bodyData.map((el: any) => {
				const formatedDateCreated = new Intl.DateTimeFormat(['ru']).format(new Date(el.date_created))
				const formatedDateUpdated = new Intl.DateTimeFormat(['ru']).format(new Date(el.date_updated))
				const image_path = changeImgPath(el.image_path)

				return (
					<TableRow key={el.id} sx={style.tableRow} hover>
						<TableCell className={s.nameCell} component='th' scope='row' sx={style.cell}>
							{/*{el.category_id}*/}
							{el.category_name}
						</TableCell>
						<TableCell sx={style.cell}>
							{/*{el.subcategory_id}*/}
							{el.subcategory_name}
						</TableCell>
						{/*<TableCell>{el.id}</TableCell>*/}
						<TableCell sx={style.cell}>
							{/*<img src={image_path} style={{ width: '50%', height: '50%' }} alt='ava' />*/}
							<img src={el.image_path} style={{ width: '50%', height: '50%' }} alt='ava' />
						</TableCell>
						<TableCell sx={style.cell}>{el.name}</TableCell>
						<TableCell sx={style.cell}>{el.description}</TableCell>
						<TableCell sx={style.cell}>{el.ingredients}</TableCell>
						<TableCell sx={style.cell}>{el.people_numbers}</TableCell>
						<TableCell sx={style.cell}>{el.price}</TableCell>
						<TableCell sx={style.cell}>{el.weight}</TableCell>
						<TableCell sx={style.cell}>
							{el.status_enabled}
							<Checkbox color='secondary' checked={el.status_enabled} />
						</TableCell>
						<TableCell sx={style.cell}>{formatedDateCreated}</TableCell>
						<TableCell sx={style.cell}>{formatedDateUpdated}</TableCell>
						<TableCell sx={style.cell}>
							<div className={s.btnsWrapper}>
								<IconButton color='primary'>
									<EditProdModal
										id={el.id}
										prevName={el.name}
										title={`${updateTitle}: ${el.name}`}
										prevDescription={el.description}
										prevStatus={el.status_enabled}
										// prevImg={image_path}
										prevImg={el.image_path}
										callback={onClickhandler}
										prevCategoryId={el.category_id}
										prevIngredients={el.ingredients}
										prevPeopleNumbers={el.people_numbers}
										prevPrice={el.price}
										prevSubcategoryId={el.subcategory_id}
										prevWeight={el.weight}
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
