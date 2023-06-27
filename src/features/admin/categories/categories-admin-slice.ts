import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { CategoryDataType, FetchCategoryResponseType } from '../admin-page-types'
import { categoriesAdminAPI, ResponseFetchShortCategories } from './categories-admin-api'
import { authActions } from '../../auth/auth-slice'
import { handleAxiosError } from '../../../common/hooks'

const token = localStorage.getItem('token')

const fetchCategoriesList = createAppAsyncThunk<FetchCategoryResponseType[], void>(
	'adminCategories/fetchCategoriesList',
	async (_, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI
		try {
			return await categoriesAdminAPI.fetchCategories()
		} catch (e) {
			console.log(e)
			return rejectWithValue(null)
		}
	}
)

const fetchShortCategoriesList = createAppAsyncThunk<ResponseFetchShortCategories[], void>(
	'adminCategories/fetchShortCategoriesList',
	async (_, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI
		try {
			return await categoriesAdminAPI.fetchShortCategories()
		} catch (e) {
			console.log(e)
			return rejectWithValue(null)
		}
	}
)

const addNewCategory = createAppAsyncThunk<void, { data: Omit<CategoryDataType, 'img_file'>; img_file: FormData }>(
	'adminCategories/addNewCategory',
	async (data, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI
		try {
			const res = await categoriesAdminAPI.addNewCategory(data)
			dispatch(adminCategoriesThunks.fetchShortCategoriesList())
			dispatch(authActions.setMessage({ message: 'Новая категория была успешно создана' }))
			dispatch(authActions.setSeverity({ severity: 'success' }))
			dispatch(adminCategoriesThunks.fetchCategoriesList())
		} catch (e) {
			console.log(e)
			handleAxiosError(dispatch, e)
			return rejectWithValue(null)
		}
	}
)

const updateCategory = createAppAsyncThunk<
	void,
	{ data: Partial<CategoryDataType>; category_id: number; img_file: FormData }
>('adminCategories/updateCategory', async (args, thunkAPI) => {
	const { dispatch, rejectWithValue, getState } = thunkAPI
	try {
		const res = await categoriesAdminAPI.updateCategory(args)
		dispatch(adminCategoriesThunks.fetchShortCategoriesList())
		dispatch(authActions.setMessage({ message: res.detail }))
		dispatch(authActions.setSeverity({ severity: 'success' }))
		dispatch(adminCategoriesThunks.fetchCategoriesList())
	} catch (e) {
		console.log(e)
		handleAxiosError(dispatch, e)
		return rejectWithValue(null)
	}
})

const deleteCategory = createAppAsyncThunk<void, number>(
	'adminCategories/deleteCategory',
	async (category_id, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI
		try {
			const res = await categoriesAdminAPI.deleteCategory(category_id)
			dispatch(adminCategoriesThunks.fetchShortCategoriesList())
			dispatch(authActions.setMessage({ message: res.detail }))
			dispatch(authActions.setSeverity({ severity: 'success' }))
			dispatch(adminCategoriesThunks.fetchCategoriesList())
		} catch (e) {
			console.log(e)
			handleAxiosError(dispatch, e)
			return rejectWithValue(null)
		}
	}
)

const slice = createSlice({
	name: 'adminCategories',
	initialState: {
		categories: [] as FetchCategoryResponseType[],
		shortCategoriesList: [] as ResponseFetchShortCategories[]
	},
	reducers: {
		// setMinPrice: (state, action: PayloadAction<{ minPrice: number }>) => {
		// 	state.minPrice = action.payload.minPrice
		// },
	},
	extraReducers: builder => {
		builder
			.addCase(fetchCategoriesList.fulfilled, (state, action) => {
				state.categories = action.payload
			})
			.addCase(fetchShortCategoriesList.fulfilled, (state, action) => {
				state.shortCategoriesList = action.payload
			})
	}
})

export const adminCategoriesSlice = slice.reducer
export const adminCategoriesActions = slice.actions
export const adminCategoriesThunks = {
	fetchCategoriesList,
	fetchShortCategoriesList,
	addNewCategory,
	updateCategory,
	deleteCategory
}
