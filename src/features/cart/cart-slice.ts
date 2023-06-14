import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { handleAxiosError } from 'common/hooks'

import { createAppAsyncThunk } from '../../common/utils/create-app-async-thunk'

import {
	cartApi,
	RequestLoginType,
	RequestNewPasswordType,
	RequestSignupType,
	ResponseSetNewPassword
} from './cart-api'

// const me = createAppAsyncThunk<void, void>('auth/me', async (_, thunkAPI) => {
// 	const { dispatch, rejectWithValue } = thunkAPI
//
// 	try {
// 		const res = await cartApi.me()
// 		dispatch(authActions.setLogin({ isLogin: true }))
// 	} catch (e) {
// 		// handleAxiosError(dispatch, e)
//
// 		return rejectWithValue(null)
// 	} finally {
// 		dispatch(authActions.setIsInitialized({ isInitialized: true }))
// 	}
// })

const slice = createSlice({
	name: 'cart',
	initialState: {},
	reducers: {
		// setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
		// 	state.isInitialized = action.payload.isInitialized
		// },
	}
	// extraReducers: builder => {
	// 	builder
	// 		.addCase(signin.fulfilled, (state, action) => {
	// 			state.isSignin = action.payload.isSignin
	// 		})
	// 		.addCase(signup.fulfilled, (state, action) => {
	// 			state.isSignup = action.payload.isSignup
	// 		})
	// }
})

export const cartSlice = slice.reducer
export const cartActions = slice.actions
export const cartThunks = {}
