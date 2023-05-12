import { createSlice } from '@reduxjs/toolkit'
import { adminCategoriesActions } from '../categories/categories-admin-slice'
import { createAppAsyncThunk } from '../../../common/utils/create-app-async-thunk'
import {
	RequestFetchSubCategoriesParamsType,
	RequestPatchSubCategoryDataType,
	RequestPostSubCategoryDataType,
	ResponseFetchSubcategoryType,
	subcategoriesAdminAPI
} from './subcategories-admin-api'

const fetchSubcategoriesList = createAppAsyncThunk<ResponseFetchSubcategoryType[], RequestFetchSubCategoriesParamsType>(
	'adminSubcategories/fetchSubcategoriesList',
	async (params, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI
		try {
			return await subcategoriesAdminAPI.fetchSubcategories(params)
		} catch (e) {
			console.log(e)
			return rejectWithValue(null)
		}
	}
)

const addNewSubcategory = createAppAsyncThunk<void, RequestPostSubCategoryDataType>(
	'adminSubcategories/addNewSubcategory',
	async (data, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI
		try {
			const res = await subcategoriesAdminAPI.addNewSubcategory(data)
			dispatch(adminSubcategoriesThunks.fetchSubcategoriesList({}))
		} catch (e) {
			console.log(e)
			return rejectWithValue(null)
		}
	}
)

const updateSubcategory = createAppAsyncThunk<void, { subcategory_id: number; data: RequestPatchSubCategoryDataType }>(
	'adminSubcategories/updateSubcategory',
	async (arg, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI
		try {
			const res = await subcategoriesAdminAPI.updateSubcategory(arg.subcategory_id, arg.data)
			dispatch(adminSubcategoriesThunks.fetchSubcategoriesList({}))
		} catch (e) {
			console.log(e)
			return rejectWithValue(null)
		}
	}
)

const deleteSubcategory = createAppAsyncThunk<void, number>(
	'adminSubcategories/deleteSubcategory',
	async (subcategory_id, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI

		try {
			const res = await subcategoriesAdminAPI.deleteSubcategory(subcategory_id)
			dispatch(adminSubcategoriesThunks.fetchSubcategoriesList({}))
		} catch (e) {
			console.log(e)
			return rejectWithValue(null)
		}
	}
)

const slice = createSlice({
	name: 'adminSubcategories',
	initialState: {
		subcategories: [] as ResponseFetchSubcategoryType[]
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchSubcategoriesList.fulfilled, (state, action) => {
			state.subcategories = action.payload
		})
	}
})

export const adminSubcategoriesSlice = slice.reducer
export const adminSubcategoriesActions = slice.actions
export const adminSubcategoriesThunks = {
	fetchSubcategoriesList,
	addNewSubcategory,
	updateSubcategory,
	deleteSubcategory
}
