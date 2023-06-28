import React, { useEffect } from 'react'
import { useActions, useAppSelector } from '../../../../common/hooks'
import { ResponseFetchShortCategories } from '../../categories/categories-admin-api'
import { ResponseFetchShortSubcategoryType } from '../../subcategries/subcategories-admin-api'
import { useSearchParams } from 'react-router-dom'
import { adminProductsThunks } from '../products-admin-slice'
import { SelectFilter } from '../../../../common/components/select-filter/SelectFilter'
import { RadioButtonsFilter } from '../../../../common/components/radio-buttons-filter/RadioButtonsFilter'
import Button from '@mui/material/Button'
import { statusEnab } from 'common/data/status-enabled-data'

export const ProdFilters = () => {
	const shortCategoriesList = useAppSelector<ResponseFetchShortCategories[]>(
		state => state.adminCategories.shortCategoriesList
	)
	const shortSubcategiriesList = useAppSelector<ResponseFetchShortSubcategoryType[]>(
		state => state.adminSubcategories.shortSubcategoriesList
	)

	const [searchParams, setSearchParams] = useSearchParams()
	const { fetchProductsList } = useActions(adminProductsThunks)

	const searchByCategory = (category_id: number) => {
		setSearchParams({ ...Object.fromEntries(searchParams), category_id: category_id.toString() })
	}

	const searchBySubcategory = (subcategory_id: number) => {
		setSearchParams({ ...Object.fromEntries(searchParams), subcategory_id: subcategory_id.toString() })
	}

	const searchByStatus = (status_enabled: boolean) => {
		setSearchParams({ ...Object.fromEntries(searchParams), status_enabled: status_enabled.toString() })
	}

	const resetFilterHandler = () => {
		;['subcategory_id', 'status_enabled', 'category_id'].forEach(el => searchParams.delete(el))
		setSearchParams({
			...Object.fromEntries(searchParams)
		})
	}

	useEffect(() => {
		fetchProductsList({ ...Object.fromEntries(searchParams) })
	}, [searchParams])

	return (
		<div style={{ display: 'flex', gap: '15px' }}>
			<SelectFilter data={shortCategoriesList} title={'категория'} callback={searchByCategory} />
			<SelectFilter data={shortSubcategiriesList} title={'подкатегория'} callback={searchBySubcategory} />
			<RadioButtonsFilter data={statusEnab} title={'доступность'} callback={searchByStatus} />
			<Button onClick={resetFilterHandler} color='error'>
				reset
			</Button>
		</div>
	)
}
