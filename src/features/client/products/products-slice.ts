import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { productsApi, ResponseFetchProduct } from 'features/client/products/products-api'
import {
	ProductsListParamsType,
	ProductsListResponseType,
	ProductType,
	SubcategoriesType
} from 'features/client/products/products-types'

const fetchProductsList = createAppAsyncThunk<ProductType[], Partial<ProductsListParamsType>>(
	'products/fetchProducts',
	async (params, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI
		try {
			const res = await productsApi.fetchProductsList(params)
			const products = res.products

			dispatch(productsActions.setTotalPagesCount({ total_pages: res.total_pages }))
			dispatch(productsActions.setPage({ page: res.page }))
			dispatch(productsActions.setTotalProductsCount({ total_products: res.total_products }))

			dispatch(productsActions.setMaxPriceState({ maxPriceState: res.price_max }))
			dispatch(productsActions.setMinPriceState({ minPriceState: res.price_min }))

			dispatch(productsActions.setMinWeightState({ minWeightState: res.weight_min }))
			dispatch(productsActions.setMaxWeightState({ maxWeightState: res.weight_max }))

			dispatch(productsActions.setMinPeopleState({ minPeopleState: res.people_numbers_min }))
			dispatch(productsActions.setMaxPeopleState({ maxPeopleState: res.people_numbers_max }))

			return products
		} catch (e) {
			console.log(e)

			return rejectWithValue(null)
		}
	}
)

const fetchSubCategories = createAppAsyncThunk<SubcategoriesType[], { category_id?: number; name?: string }>(
	'products/fetchSubCategories',
	async (arg, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI
		try {
			const res = await productsApi.fetchSubCategories(arg)

			return res
		} catch (e) {
			console.log(e)

			return rejectWithValue(null)
		}
	}
)

const fetchProduct = createAppAsyncThunk<ResponseFetchProduct, number>(
	'products/fetchProduct',
	async (product_id, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI
		try {
			return await productsApi.fetchProduct(product_id)
		} catch (e) {
			console.log(e)

			return rejectWithValue(null)
		}
	}
)

const slice = createSlice({
	name: 'products',
	initialState: {
		price_min: 0,
		price_max: 1000,
		minPriceState: 0,
		maxPriceState: 1000,
		minWeightState: 0,
		maxWeightState: 1000,
		maxPeopleState: 0,
		minPeopleState: 0,
		category_id: 0,
		product_id: 0,
		category_name: '',
		category_description: '',
		subcategories: [] as SubcategoriesType[],
		products: [] as ProductType[],
		product: {} as ResponseFetchProduct,
		page_count: 18,
		total_products: 0,
		page: 0,
		total_pages: 0
	},
	reducers: {
		setMinPeopleState: (state, action: PayloadAction<{ minPeopleState: number }>) => {
			state.minPeopleState = action.payload.minPeopleState
		},
		setMaxPeopleState: (state, action: PayloadAction<{ maxPeopleState: number }>) => {
			state.maxPeopleState = action.payload.maxPeopleState
		},
		setMaxWeightState: (state, action: PayloadAction<{ maxWeightState: number }>) => {
			state.maxWeightState = action.payload.maxWeightState
		},
		setMinWeightState: (state, action: PayloadAction<{ minWeightState: number }>) => {
			state.minWeightState = action.payload.minWeightState
		},
		setPrice_min: (state, action: PayloadAction<{ price_min: number }>) => {
			state.price_min = action.payload.price_min
		},
		setPrice_max: (state, action: PayloadAction<{ price_max: number }>) => {
			state.price_max = action.payload.price_max
		},
		setProductId: (state, action: PayloadAction<{ product_id: number }>) => {
			state.product_id = action.payload.product_id
		},
		setMinPriceState: (state, action: PayloadAction<{ minPriceState: number }>) => {
			state.minPriceState = action.payload.minPriceState
		},
		setMaxPriceState: (state, action: PayloadAction<{ maxPriceState: number }>) => {
			state.maxPriceState = action.payload.maxPriceState
		},
		setCategoryDescription: (state, action: PayloadAction<{ category_description: string }>) => {
			state.category_description = action.payload.category_description
		},
		setCategoryName: (state, action: PayloadAction<{ category_name: string }>) => {
			state.category_name = action.payload.category_name
		},
		setCategoryId: (state, action: PayloadAction<{ category_id: number }>) => {
			state.category_id = action.payload.category_id
		},
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
		builder
			.addCase(fetchProductsList.fulfilled, (state, action) => {
				state.products = action.payload
			})
			.addCase(fetchSubCategories.fulfilled, (state, action) => {
				state.subcategories = action.payload
			})
			.addCase(fetchProduct.fulfilled, (state, action) => {
				state.product = action.payload
			})
	}
})

export const productsSlice = slice.reducer
export const productsActions = slice.actions
export const productsThunks = { fetchProductsList, fetchSubCategories, fetchProduct }
