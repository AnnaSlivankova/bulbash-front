import React from 'react'
import s from './SubcategoriesAdmin.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { RequestPostSubCategoryDataType, ResponseFetchSubcategoryType } from './subcategories-admin-api'
import { useActions } from '../../../common/hooks'
import { adminSubcategoriesThunks } from './subcategories-admin-slice'
import { AddSubModal } from '../../../common/components/modals/add-modals/AddSubModal'
import { TableComponent } from '../../../common/components/table/Table'
import { subcategoriesData } from '../../../common/data/table-head-data'
import { SubFiters } from './sub-filters/SubFiters'

export const SubcategoriesAdmin = () => {
	const subcategories = useSelector<RootState, ResponseFetchSubcategoryType[]>(
		state => state.adminSubcategories.subcategories
	)

	const { fetchSubcategoriesList, addNewSubcategory } = useActions(adminSubcategoriesThunks)

	// useEffect(() => {
	// 	fetchSubcategoriesList({})
	// }, [])

	const onClickHandler = (data: RequestPostSubCategoryDataType) => {
		addNewSubcategory(data)
	}

	return (
		<div className={s.wrapper}>
			<SubFiters />
			{/*<h1>Subcategories</h1>*/}
			<AddSubModal title={'Добавить новую подкатегорию'} btnTitle={'Добавить подкатегорию'} callback={onClickHandler} />
			<TableComponent
				type={'SUB'}
				sort={''}
				headData={subcategoriesData}
				bodyData={subcategories}
				deleteTitle={'Удалить подкатегорию'}
				updateTitle={'Обновить подкатегорию'}
			/>
		</div>
	)
}
