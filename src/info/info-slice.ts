import { createAppAsyncThunk } from '../common/utils/create-app-async-thunk'
import { infoApi, ResponseInfo, ShortContacts } from './info-api'
import { createSlice } from '@reduxjs/toolkit'

const getShortInfo = createAppAsyncThunk<any, void>('info/getShortInfo', async (_, thunkAPI) => {
	const { dispatch, rejectWithValue, getState } = thunkAPI

	try {
		const res = await infoApi.getShortInfo()
		const contacts = res.contacts
	} catch (e) {
		console.log(e)
		return rejectWithValue(null)
	}
})

const getInfo = createAppAsyncThunk<any, void>('info/getInfo', async (_, thunkAPI) => {
	const { dispatch, rejectWithValue, getState } = thunkAPI

	try {
		const res = await infoApi.getInfo()
		const contacts = res.contacts
	} catch (e) {
		console.log(e)
		return rejectWithValue(null)
	}
})

const slice = createSlice({
	name: 'info',
	initialState: {
		info: {} as ResponseInfo,
		shortInfo: {} as ResponseInfo<ShortContacts>
	},
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getShortInfo.fulfilled, (state, action) => {
			state.shortInfo = action.payload
		})
	}
})

export const infoSlice = slice.reducer
export const infoActions = slice.actions
export const infoThunks = { getInfo, getShortInfo }
