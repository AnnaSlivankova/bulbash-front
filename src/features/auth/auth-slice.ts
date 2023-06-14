import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { handleAxiosError } from 'common/hooks'

import { createAppAsyncThunk } from '../../common/utils/create-app-async-thunk'

import {
	authAPI,
	RequestLoginType,
	RequestNewPasswordType,
	RequestSignupType,
	ResponseSetNewPassword
} from './auth-api'

const me = createAppAsyncThunk<void, void>('auth/me', async (_, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI

	try {
		const res = await authAPI.me()
		dispatch(authActions.setLogin({ isLogin: true }))
	} catch (e) {
		// handleAxiosError(dispatch, e)

		return rejectWithValue(null)
	} finally {
		dispatch(authActions.setIsInitialized({ isInitialized: true }))
	}
})

const login = createAppAsyncThunk<any, RequestLoginType>('auth/login', async (data: RequestLoginType, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI

	try {
		const res = await authAPI.login(data)
		localStorage.setItem('token', res.access_token)

		dispatch(authActions.setMessage({ message: 'Вы успешно вошли в свою учетную запись' }))
		dispatch(authActions.setSeverity({ severity: 'success' }))
		dispatch(authActions.setLogin({ isLogin: true }))

		// dispatch(authActions.loginSuccess(token))
	} catch (e) {
		handleAxiosError(dispatch, e)

		return rejectWithValue(null)
	}
})

const signup = createAppAsyncThunk<any, RequestSignupType>('auth/signup', async (data: RequestSignupType, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI

	try {
		const res = await authAPI.signup(data)
		console.log(res)
		dispatch(authActions.setMessage({ message: res.message }))
		dispatch(authActions.setSeverity({ severity: 'info' }))
		// dispatch(authActions.loginSuccess(res.token))
	} catch (e) {
		handleAxiosError(dispatch, e)
		console.log(e)
		// dispatch(authActions.setMessage({ message: e.message as string }))
		// dispatch(authActions.setSeverity({ severity: 'error' }))
		return rejectWithValue(null)
	}
})

const logout = createAppAsyncThunk<any, any>('auth/logout', async (_, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI

	try {
		const res = await authAPI.logout()
		localStorage.removeItem('token')
		dispatch(authActions.setMessage({ message: res.message }))
		dispatch(authActions.setSeverity({ severity: 'success' }))
		dispatch(authActions.setLogin({ isLogin: false }))
	} catch (e) {
		handleAxiosError(dispatch, e)

		return rejectWithValue(null)
	}
})

const restorePassword = createAppAsyncThunk<any, string>('auth/restorePassword', async (data, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI

	try {
		const res = await authAPI.restorePassword(data)
		dispatch(authActions.setMessage({ message: res.message }))
		dispatch(authActions.setSeverity({ severity: 'info' }))
	} catch (e) {
		handleAxiosError(dispatch, e)

		return rejectWithValue(null)
	}
})

const setNewPassword = createAppAsyncThunk<ResponseSetNewPassword, RequestNewPasswordType>(
	'auth/setNewPassword',
	async (data, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI

		try {
			const res = await authAPI.setNewPassword(data)
			localStorage.setItem('token', res.access_token)
			dispatch(authActions.setMessage({ message: res.message }))
			dispatch(authActions.setSeverity({ severity: 'success' }))
			dispatch(authActions.setLogin({ isLogin: true }))

			return res
		} catch (e) {
			handleAxiosError(dispatch, e)

			return rejectWithValue(null)
		}
	}
)

const verifyEmail = createAppAsyncThunk<any, string>('auth/verifyEmail', async (token, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI

	try {
		const res = await authAPI.verifyEmail(token)
		localStorage.setItem('token', res.access_token)
		dispatch(authActions.setMessage({ message: 'Ваш email успешно подтвержден' }))
		dispatch(authActions.setSeverity({ severity: 'success' }))
		dispatch(authActions.setLogin({ isLogin: true }))
	} catch (e) {
		handleAxiosError(dispatch, e)

		return rejectWithValue(null)
	}
})

const slice = createSlice({
	name: 'auth',
	initialState: {
		token: localStorage.getItem('token'),
		// refreshToken: localStorage.getItem('refreshToken'),
		isLogin: false,
		isSignup: false,
		isInitialized: false as boolean | undefined,
		error: null as string | null,
		authStatus: 'idle' as RequestStatusType,
		message: null as string | null,
		severity: '' as SeverityType
	},
	reducers: {
		setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
			state.isInitialized = action.payload.isInitialized
		},
		setMessage: (state, action: PayloadAction<{ message: string | null }>) => {
			state.message = action.payload.message
		},
		setSeverity: (state, action: PayloadAction<{ severity: SeverityType }>) => {
			state.severity = action.payload.severity
		},
		setLogin: (state, action: PayloadAction<{ isLogin: boolean }>) => {
			state.isLogin = action.payload.isLogin
		},
		setError: (state, action: PayloadAction<{ error: string | null }>) => {
			state.error = action.payload.error
		}
		// setAuthStatus: (state, action: PayloadAction<{ authStatus: RequestStatusType }>) => {
		// 	state.authStatus = action.payload.authStatus
		// },
		// setLogout: (state, action: PayloadAction<{ isSignin: boolean }>) => {
		// 	state.isSignin = action.payload.isSignin
		// }
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

export const authSlice = slice.reducer
export const authActions = slice.actions
export const authThunks = { login, signup, me, logout, restorePassword, setNewPassword, verifyEmail }

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SeverityType = 'error' | 'warning' | 'info' | 'success'
