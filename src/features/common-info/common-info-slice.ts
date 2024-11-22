import { createAppAsyncThunk } from '../../common/utils/create-app-async-thunk'
import { AboutUsType } from './common-info-types'
import { commonInfoApi } from './common-info-api'
import { createSlice } from '@reduxjs/toolkit'

const fetchAboutUsInfo = createAppAsyncThunk<AboutUsType, void>('commonInfo/fetchAboutUsInfo', async (_, thunkAPI) => {
	const { dispatch, rejectWithValue, getState } = thunkAPI

	try {
		return await commonInfoApi.fetchAboutUsInfo()
	} catch (e) {
		console.log(e)
		return rejectWithValue(null)
	}
})

const slice = createSlice({
	name: 'commonInfo',
	initialState: {
		aboutUs: {} as AboutUsType
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchAboutUsInfo.fulfilled, (state, action) => {
			state.aboutUs = action.payload
		})
	}
})

export const commonInfoSlice = slice.reducer
export const commonInfoActions = slice.actions
export const commonInfoThunks = { fetchAboutUsInfo }
