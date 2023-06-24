import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../../common/utils/create-app-async-thunk'
import {
	GetAllOrdersParamsType,
	orderApi,
	OrderType,
	RequestNewOrderType,
	ResponseGetAllOrders,
	ResponseGetUserOrderType
} from './order-api'
import { handleAxiosError } from '../../common/hooks'
import { authActions } from '../auth/auth-slice'
import { userCartThunks } from '../cart/userCart-slice'

const createNewOrder = createAppAsyncThunk<void, RequestNewOrderType>(
	'order/createNewOrder',
	async (data, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI

		try {
			const res = await orderApi.createNewOrder(data)
			dispatch(authActions.setMessage({ message: res.message }))
			dispatch(authActions.setSeverity({ severity: 'success' }))
			dispatch(userCartThunks.getCardItems())
		} catch (e) {
			handleAxiosError(dispatch, e)

			return rejectWithValue(null)
		}
	}
)

const getAllUserOrders = createAppAsyncThunk<OrderType[], Partial<GetAllOrdersParamsType>>(
	'order/getAllUserOrders',
	async (params, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI

		try {
			const res = await orderApi.getAllUserOrders(params)
			return res.data
		} catch (e) {
			handleAxiosError(dispatch, e)

			return rejectWithValue(null)
		}
	}
)

const getUserOrder = createAppAsyncThunk<ResponseGetUserOrderType, number>(
	'order/getUserOrder',
	async (order_id, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI

		try {
			const res = await orderApi.getUserOrder(order_id)
			return res
		} catch (e) {
			handleAxiosError(dispatch, e)

			return rejectWithValue(null)
		}
	}
)

const slice = createSlice({
	name: 'order',
	initialState: {
		orders: [] as OrderType[],
		order: {} as ResponseGetUserOrderType
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getAllUserOrders.fulfilled, (state, action) => {
				state.orders = action.payload
			})
			.addCase(getUserOrder.fulfilled, (state, action) => {
				state.order = action.payload
			})
	}
})

export const orderSlice = slice.reducer
export const orderAction = slice.actions
export const orderThunks = { createNewOrder, getAllUserOrders, getUserOrder }
