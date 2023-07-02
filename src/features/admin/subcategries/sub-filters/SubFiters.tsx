import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useActions, useAppSelector } from '../../../../common/hooks'
import { adminSubcategoriesThunks } from '../subcategories-admin-slice'
import Button from '@mui/material/Button'
import { SelectFilter } from '../../../../common/components/select-filter/SelectFilter'
import { ResponseFetchShortCategories } from '../../categories/categories-admin-api'
import { ResponseFetchShortSubcategoryType } from '../subcategories-admin-api'
import { RadioButtonsFilter } from '../../../../common/components/radio-buttons-filter/RadioButtonsFilter'
import { statusEnab } from '../../../../common/data/status-enabled-data'
import s from './SubFilters.module.css'

export const SubFiters = () => {
	const shortCategoriesList = useAppSelector<ResponseFetchShortCategories[]>(
		state => state.adminCategories.shortCategoriesList
	)
	// const shortSubcategiriesList = useAppSelector<ResponseFetchShortSubcategoryType[]>(
	// 	state => state.adminSubcategories.shortSubcategoriesList
	// )

	const [searchParams, setSearchParams] = useSearchParams()
	const { fetchSubcategoriesList } = useActions(adminSubcategoriesThunks)

	const searchByCategory = (category_id: number) => {
		setSearchParams({ ...Object.fromEntries(searchParams), category_id: category_id.toString() })
	}

	// const searchByName = (name: string) => {
	// 	setSearchParams({ ...Object.fromEntries(searchParams), name: name.toString() })
	// }

	const searchByStatus = (status_enabled: boolean) => {
		setSearchParams({ ...Object.fromEntries(searchParams), status_enabled: status_enabled.toString() })
	}

	const resetFilterHandler = () => {
		;['name', 'status_enabled', 'category_id'].forEach(el => searchParams.delete(el))
		setSearchParams({
			...Object.fromEntries(searchParams)
		})
	}

	useEffect(() => {
		fetchSubcategoriesList({ ...Object.fromEntries(searchParams) })
	}, [searchParams])

	return (
		<div className={s.wrapper}>
			{/*<SelectFilter data={shortSubcategiriesList} title={'название'} />*/}
			<SelectFilter data={shortCategoriesList} title={'категория'} callback={searchByCategory} />
			<RadioButtonsFilter data={statusEnab} title={'доступность'} callback={searchByStatus} />
			<Button onClick={resetFilterHandler} color='error'>
				reset
			</Button>
		</div>
	)
}
