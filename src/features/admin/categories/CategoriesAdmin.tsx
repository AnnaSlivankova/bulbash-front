import React, { useEffect } from 'react'
import { TableComponent } from '../../../common/components/table/Table'
import { categoriesData } from '../../../common/data/table-head-data'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { FetchCategoryResponseType } from '../admin-page-types'
import { useActions } from '../../../common/hooks'
import { adminCategoriesThunks } from './categories-admin-slice'
import s from './CategoriesAdmin.module.css'
import { AddCatModal } from '../../../common/components/modals/add-modals/AddCatModal'

export const CategoriesAdmin = () => {
	const categories = useSelector<RootState, FetchCategoryResponseType[]>(state => state.adminCategories.categories)
	const { fetchCategoriesList, addNewCategory } = useActions(adminCategoriesThunks)

	useEffect(() => {
		fetchCategoriesList({})
	}, [])

	const onClickHandler = (data: any) => {
		addNewCategory(data)
	}

	return (
		<div className={s.wrapper}>
			<AddCatModal btnTitle={'Добавить категорию'} title={'Добавить новую категорию'} callback={onClickHandler} />
			<TableComponent
				type={'CAT'}
				headData={categoriesData}
				bodyData={categories}
				sort={''}
				deleteTitle={'Удалить категорию'}
				updateTitle={'Обновить категорию'}
			/>
		</div>
	)
}
