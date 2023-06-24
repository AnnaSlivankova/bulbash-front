import React from 'react'
import { TableHeadComponent } from './table-head/TableHead'
import { TableBodyCatComponent } from './table-body/TableBodyCat'
import { FetchCategoryResponseType } from '../../../features/admin/admin-page-types'
import { categoriesDataType } from '../../data/table-head-data'
import { Table, TableContainer } from '@mui/material'
import Paper from '@mui/material/Paper'
import { ResponseFetchSubcategoryType } from '../../../features/admin/subcategries/subcategories-admin-api'
import { TableBodySubComponent } from './table-body/TableBodySub'
import { ResponseFetchProducts } from '../../../features/admin/products/products-admin-api'
import { TableBodyProdComponent } from './table-body/TableBodyProd'
import { OrderType } from '../../../features/order/order-api'
import { TableBodyUserOrd } from './table-body/TableBodyUserORD'
import { OrderAdminType } from '../../../features/admin/orders-admin/orders-admin-api'
import { TableBodyAdminOrd } from './table-body/TableBodyAdminORD'

export const TableComponent: React.FC<Type> = ({ headData, bodyData, sort, deleteTitle, updateTitle, type }) => {
	return (
		<>
			<TableContainer component={Paper} sx={{ width: '95%' }}>
				<Table aria-label='simple table'>
					<TableHeadComponent sort={sort} headData={headData} />
					{type === 'SUB' && (
						<TableBodySubComponent bodyData={bodyData} updateTitle={updateTitle} deleteTitle={deleteTitle} />
					)}
					{type === 'CAT' && (
						<TableBodyCatComponent bodyData={bodyData} updateTitle={updateTitle} deleteTitle={deleteTitle} />
					)}
					{type === 'PROD' && (
						<TableBodyProdComponent bodyData={bodyData} updateTitle={updateTitle} deleteTitle={deleteTitle} />
					)}
					{type === 'UORD' && <TableBodyUserOrd bodyData={bodyData} />}
					{type === 'AORD' && <TableBodyAdminOrd bodyData={bodyData} updateTitle={updateTitle} />}
				</Table>
			</TableContainer>
		</>
	)
}

type Type = {
	sort: string | undefined
	headData: categoriesDataType[]
	bodyData:
		| FetchCategoryResponseType[]
		| ResponseFetchSubcategoryType[]
		| ResponseFetchProducts[]
		| OrderType[]
		| OrderAdminType[]
	deleteTitle: string
	updateTitle: string
	type: 'CAT' | 'SUB' | 'PROD' | 'UORD' | 'AORD'
}
