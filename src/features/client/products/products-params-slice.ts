import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductsListParamsType } from './products-types'

const slice = createSlice({
	name: 'productsSearchParams',
	initialState: {
		page: undefined,
		people_of_numbers: undefined,
		price_min: undefined,
		price_max: undefined,
		category_id: undefined,
		subcategory_id: undefined,
		weight_min: undefined,
		weight_max: undefined
	} as Partial<ProductsListParamsType>,
	reducers: {
		setProductsSearchParams: (state, action: PayloadAction<{ params: Partial<ProductsListParamsType> }>) => {
			state.page = action.payload.params.page
			state.people_of_numbers = action.payload.params.people_of_numbers
			state.price_min = action.payload.params.price_min
			state.price_max = action.payload.params.price_max
			state.category_id = action.payload.params.category_id
			state.subcategory_id = action.payload.params.subcategory_id
			state.weight_min = action.payload.params.weight_min
			state.weight_max = action.payload.params.weight_max
		}
	}
})

export const productsParamsSlice = slice.reducer
export const productsParamsActions = slice.actions
