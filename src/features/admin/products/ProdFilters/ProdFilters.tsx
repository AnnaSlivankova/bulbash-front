import React, { ChangeEvent, useEffect, useState } from 'react'
import { useActions, useAppSelector } from '../../../../common/hooks'
import { ResponseFetchShortCategories } from '../../categories/categories-admin-api'
import {
	ResponseFetchShortSubcategoryType,
	ResponseFetchSubcategoryType
} from '../../subcategries/subcategories-admin-api'
import { useSearchParams } from 'react-router-dom'
import { adminProductsThunks } from '../products-admin-slice'
import { SelectFilter } from '../../../../common/components/select-filter/SelectFilter'
import { RadioButtonsFilter } from '../../../../common/components/radio-buttons-filter/RadioButtonsFilter'
import Button from '@mui/material/Button'
import { statusEnab } from 'common/data/status-enabled-data'
import s from './ProdFilters.module.css'
import { FetchCategoryResponseType } from '../../admin-page-types'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { SelectChangeEvent } from '@mui/material'
import Box from '@mui/material/Box'

export const ProdFilters = () => {
	const shortCategoriesList = useAppSelector<ResponseFetchShortCategories[]>(
		state => state.adminCategories.shortCategoriesList
	)
	const shortSubcategiriesList = useAppSelector<ResponseFetchShortSubcategoryType[]>(
		state => state.adminSubcategories.shortSubcategoriesList
	)

	const subcategoriesList = useAppSelector<ResponseFetchSubcategoryType[]>(
		state => state.adminSubcategories.subcategories
	)
	const [chosenCategory, setChosenCategory] = useState<string | number>('')
	const [chosenSubcategory, setChosenSubcategory] = useState<string | number>('')

	const handleSubcategorySelectChange = (e: SelectChangeEvent<string | number>) => {
		setChosenSubcategory(+e.target.value)
		setSearchParams({ ...Object.fromEntries(searchParams), subcategory_id: e.target.value as string })
	}

	const [searchParams, setSearchParams] = useSearchParams()
	const { fetchProductsList } = useActions(adminProductsThunks)

	const searchByCategory = (category_id: number) => {
		setChosenCategory(category_id as number)
		setSearchParams({ ...Object.fromEntries(searchParams), category_id: category_id.toString() })
	}

	// const searchBySubcategory = (subcategory_id: number) => {
	// 	setSearchParams({ ...Object.fromEntries(searchParams), subcategory_id: subcategory_id.toString() })
	// }

	const searchByStatus = (status_enabled: boolean) => {
		setSearchParams({ ...Object.fromEntries(searchParams), status_enabled: status_enabled.toString() })
	}

	const resetFilterHandler = () => {
		;['subcategory_id', 'status_enabled', 'category_id'].forEach(el => searchParams.delete(el))
		setSearchParams({
			...Object.fromEntries(searchParams)
		})
		setChosenCategory('')
		setChosenSubcategory('')
	}

	useEffect(() => {
		fetchProductsList({ ...Object.fromEntries(searchParams) })
	}, [searchParams])

	return (
		<div className={s.wrapper}>
			<SelectFilter data={shortCategoriesList} title={'категория'} callback={searchByCategory} />
			{/*<SelectFilter data={shortSubcategiriesList} title={'подкатегория'} callback={searchBySubcategory} />*/}
			<Box sx={{ minWidth: 150 }}>
				<FormControl fullWidth>
					<InputLabel id='demo-simple-select-label' color='secondary'>
						подкатегория
					</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={chosenSubcategory}
						label={`подкатегория`}
						onChange={handleSubcategorySelectChange}
						color='secondary'
					>
						{!chosenCategory
							? shortSubcategiriesList.map(el => (
									<MenuItem value={el.id} key={el.id}>
										{el.name}
									</MenuItem>
							  ))
							: subcategoriesList
									.filter(el => el.category_id === chosenCategory)
									.map(el => (
										<MenuItem value={el.id} key={el.id}>
											{el.name}
										</MenuItem>
									))}
					</Select>
				</FormControl>
			</Box>

			<RadioButtonsFilter data={statusEnab} title={'доступность'} callback={searchByStatus} />
			<Button onClick={resetFilterHandler} color='error'>
				reset
			</Button>
		</div>
	)
}
