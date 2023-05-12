import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from 'common/utils/create-app-async-thunk'
import { categoriesAPI } from 'features/client/categories/categories-api'
import { CategoryItemType } from 'features/client/categories/categories-types'

const fetchCategories = createAppAsyncThunk<CategoryItemType[], void>(
	'categories/fetchCategories',
	async (_, thunkAPI) => {
		const { dispatch, rejectWithValue, getState } = thunkAPI
		try {
			return await categoriesAPI.fetchCategories()
		} catch (e) {
			console.log(e)

			return rejectWithValue(null)
		}
	}
)

const slice = createSlice({
	name: 'categories',
	initialState: {
		categories: [] as CategoryItemType[]
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			state.categories = action.payload
		})
	}
})

export const categoriesSlice = slice.reducer
export const categoriesActions = slice.actions
export const categoriesThunks = { fetchCategories }
