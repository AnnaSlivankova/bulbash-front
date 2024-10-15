import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { handleAxiosError } from 'common/hooks'

import { createAppAsyncThunk } from '../../common/utils/create-app-async-thunk'
import {
	CartItemType,
	RequestAddItemType,
	RequestUpdateItemType,
	ResponseGetCartItemsType,
	userCartApi
} from './userCart-api'
import { authActions, authThunks, SeverityType } from '../auth/auth-slice'
import { productsAdminAPI } from '../admin/products/products-admin-api'
import { adminProductsThunks } from '../admin/products/products-admin-slice'

const getCardItems = createAppAsyncThunk<ResponseGetCartItemsType, void>('userCart/getItems', async (_, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI

	try {
		const res = await userCartApi.getCartItems()

		return res
	} catch (e) {
		handleAxiosError(dispatch, e)
		console.log(`token req: ${localStorage.getItem('token')}`)
		return rejectWithValue(null)
	}
})

const addItemToCard = createAppAsyncThunk<void, RequestAddItemType>('userCart/addItem', async (data, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI

	try {
		const res = await userCartApi.addItemToCard(data)
		dispatch(authActions.setMessage({ message: 'Товар успешно добавлен в корзину' }))
		dispatch(authActions.setSeverity({ severity: 'success' }))
		dispatch(userCartThunks.getCardItems())
	} catch (e) {
		handleAxiosError(dispatch, e)

		return rejectWithValue(null)
	}
})

const updateCardItem = createAppAsyncThunk<void, RequestUpdateItemType>(
	'userCart/updateItem',
	async (data, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI

		try {
			const res = await userCartApi.updateItemQuantity(data)
			dispatch(authActions.setMessage({ message: res.message }))
			dispatch(authActions.setSeverity({ severity: 'success' }))
			dispatch(userCartThunks.getCardItems())
		} catch (e) {
			handleAxiosError(dispatch, e)

			return rejectWithValue(null)
		}
	}
)

const deleteCardItem = createAppAsyncThunk<void, number>('userCart/deleteItem', async (id, thunkAPI) => {
	const { dispatch, rejectWithValue, getState } = thunkAPI

	try {
		const res = await userCartApi.deleteCartItem(id)
		dispatch(authActions.setMessage({ message: res.message }))
		dispatch(authActions.setSeverity({ severity: 'success' }))
		dispatch(userCartThunks.getCardItems())
	} catch (e) {
		handleAxiosError(dispatch, e)

		return rejectWithValue(null)
	}
})

const setNotification = createAppAsyncThunk<void, { msg: string; severity: SeverityType }>(
	'userCart/notification',
	async (data, thunkAPI) => {
		const { dispatch } = thunkAPI
		dispatch(authActions.setMessage({ message: data.msg }))
		dispatch(authActions.setSeverity({ severity: data.severity }))
	}
)

const slice = createSlice({
	name: 'userCart',
	initialState: {
		userCart: {} as ResponseGetCartItemsType
	},
	reducers: {
		// setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
		// 	state.isInitialized = action.payload.isInitialized
		// },
	},
	extraReducers: builder => {
		builder.addCase(getCardItems.fulfilled, (state, action) => {
			state.userCart = action.payload
		})
	}
})

export const userCartSlice = slice.reducer
export const userCartActions = slice.actions
export const userCartThunks = { getCardItems, addItemToCard, updateCardItem, deleteCardItem, setNotification }
