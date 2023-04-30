import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { subcategoriesApi } from 'features/subcategories/subcategories-api'
import { ProductsListParamsType, ProductType } from 'features/subcategories/subcategories-types'

const fetchProductsList = createAppAsyncThunk<ProductType[], Partial<ProductsListParamsType>>(
	'',
	async (params, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI
		try {
			const res = await subcategoriesApi.fetchProductsList({})

			return res.products
		} catch (e) {
			console.log(e)

			return rejectWithValue(null)
		}
	}
)

const slice = createSlice({
	name: 'subcategiries',
	initialState: {
		products: [] as ProductType[],
		total_products: 0,
		page: 1,
		total_pages: 100
	},
	reducers: {
		setTotalProductsCount: (state, action: PayloadAction<{ total_products: number }>) => {
			state.total_products = action.payload.total_products
		},
		setPage: (state, action: PayloadAction<{ page: number }>) => {
			state.page = action.payload.page
		},
		setTotalPagesCount: (state, action: PayloadAction<{ total_pages: number }>) => {
			state.total_pages = action.payload.total_pages
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchProductsList.fulfilled, (state, action) => {
			state.products = action.payload
		})
	}
})

export const subcategoriesSlice = slice.reducer
export const subcategoriesActions = slice.actions
export const subcategoriesThunks = { fetchProductsList }
