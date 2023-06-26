import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { productsAdminAPI, RequestPostProduct, ResponseFetchProducts } from './products-admin-api'
import { createAppAsyncThunk } from '../../../common/utils/create-app-async-thunk'
import { categoriesAdminAPI } from '../categories/categories-admin-api'
import { CategoryDataType } from '../admin-page-types'
import { adminCategoriesThunks } from '../categories/categories-admin-slice'
import { authActions } from '../../auth/auth-slice'
import { handleAxiosError } from '../../../common/hooks'

const fetchProductsList = createAppAsyncThunk<ResponseFetchProducts[], void>(
	'adminProducts/fetchProductsList',
	async (_, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI
		try {
			return await productsAdminAPI.fetchProducts()
		} catch (e) {
			console.log(e)
			return rejectWithValue(null)
		}
	}
)

const addNewProduct = createAppAsyncThunk<void, { params: RequestPostProduct; img_file: FormData }>(
	'adminProducts/addNewProduct',
	async (arg, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI
		try {
			const res = await productsAdminAPI.addNewProduct(arg.params, arg.img_file)
			dispatch(authActions.setMessage({ message: 'Новый продукт был успешно создан' }))
			dispatch(authActions.setSeverity({ severity: 'success' }))
			dispatch(adminProductsThunks.fetchProductsList())
		} catch (e) {
			console.log(e)
			handleAxiosError(dispatch, e)
			return rejectWithValue(null)
		}
	}
)

const updateProduct = createAppAsyncThunk<
	void,
	{ product_id: number; params: Partial<RequestPostProduct>; img_file?: FormData }
>('adminProducts/updateProduct', async (arg, thunkAPI) => {
	const { dispatch, rejectWithValue, getState } = thunkAPI
	try {
		const res = await productsAdminAPI.updateProduct(arg.product_id, arg.params, arg.img_file)
		dispatch(authActions.setMessage({ message: res.detail }))
		dispatch(authActions.setSeverity({ severity: 'success' }))
		dispatch(adminProductsThunks.fetchProductsList())
	} catch (e) {
		console.log(e)
		handleAxiosError(dispatch, e)
		return rejectWithValue(null)
	}
})

const deleteProduct = createAppAsyncThunk<void, number>('adminProducts/deleteProduct', async (product_id, thunkAPI) => {
	const { dispatch, rejectWithValue, getState } = thunkAPI
	try {
		const res = await productsAdminAPI.deleteProduct(product_id)
		dispatch(authActions.setMessage({ message: res.detail }))
		dispatch(authActions.setSeverity({ severity: 'success' }))
		dispatch(adminProductsThunks.fetchProductsList())
	} catch (e) {
		console.log(e)
		handleAxiosError(dispatch, e)
		return rejectWithValue(null)
	}
})

const slice = createSlice({
	name: 'adminProducts',
	initialState: {
		products: [] as ResponseFetchProducts[]
	},
	reducers: {
		// setAdditionalInfo: (state, action: PayloadAction<ResponseFetchProducts[]>) => {
		// 	state.additionalInfo = action.payload.map(obj => ({
		// 		category_id: obj.category_id,
		// 		category_name: obj.category_name,
		// 		subcategory_name: obj.subcategory_name,
		// 		subcategory_id: obj.subcategory_id
		// 	}))
		// }
	},
	extraReducers: builder => {
		builder.addCase(fetchProductsList.fulfilled, (state, action) => {
			state.products = action.payload
		})
	}
})

export const adminProductsSlice = slice.reducer
export const adminProductsActions = slice.actions
export const adminProductsThunks = { fetchProductsList, addNewProduct, updateProduct, deleteProduct }
