import React, { useEffect } from 'react'
import s from '../categories/CategoriesAdmin.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { RequestPostProduct, ResponseFetchProducts } from './products-admin-api'
import { useActions } from '../../../common/hooks'
import { adminProductsThunks } from './products-admin-slice'
import { AddProdModal } from '../../../common/components/modals/add-modals/AddProdModal'
import { TableComponent } from '../../../common/components/table/Table'
import { productsData } from '../../../common/data/table-head-data'
import { ProdFilters } from './ProdFilters/ProdFilters'

export const ProductsAdmin = () => {
	const products = useSelector<RootState, ResponseFetchProducts[]>(state => state.adminProducts.products)
	const { fetchProductsList, addNewProduct } = useActions(adminProductsThunks)

	// useEffect(() => {
	// 	fetchProductsList({})
	// }, [])

	const addNewProductHandler = (params: RequestPostProduct, img_file: FormData) => {
		addNewProduct({ params, img_file })
	}

	return (
		<div className={s.wrapper}>
			<ProdFilters />
			{/*<h1>Products</h1>*/}
			<AddProdModal btnTitle={'Добавить продукт'} title={'Добавить новый продукт'} callback={addNewProductHandler} />
			<TableComponent
				sort={''}
				headData={productsData}
				bodyData={products}
				deleteTitle={'Удалить продукт'}
				updateTitle={'Обновить продукт'}
				type={'PROD'}
			/>
		</div>
	)
}
