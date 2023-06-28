import { createSlice } from '@reduxjs/toolkit'
import { createAppAsyncThunk } from '../../../common/utils/create-app-async-thunk'

import { handleAxiosError } from '../../../common/hooks'
import {
	GetAllOrdersAdminParamsType,
	orderAdminApi,
	OrderAdminType,
	RequestUpdateOrderDataType,
	ResponseGetOrderAdminType
} from './orders-admin-api'
import { authActions } from '../../auth/auth-slice'

const getAllOrders = createAppAsyncThunk<OrderAdminType[], Partial<GetAllOrdersAdminParamsType>>(
	'orderAdmin/getAllOrders',
	async (params, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI

		try {
			const res = await orderAdminApi.getAllOrders(params)
			// dispatch(authActions.setIsAdmin({ isAdmin: true }))
			return res.data
		} catch (e) {
			// handleAxiosError(dispatch, e)

			dispatch(authActions.setIsAdmin({ isAdmin: false }))

			return rejectWithValue(null)
		}
	}
)

const getOrder = createAppAsyncThunk<ResponseGetOrderAdminType, number>(
	'orderAdmin/getOrder',
	async (order_id, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI

		try {
			return await orderAdminApi.getOrder(order_id)
		} catch (e) {
			// handleAxiosError(dispatch, e)

			return rejectWithValue(null)
		}
	}
)

const updateUserOrder = createAppAsyncThunk<void, RequestUpdateOrderDataType>(
	'orderAdmin/updateUserOrder',
	async (data, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI

		try {
			const res = await orderAdminApi.updateOrderStatus(data)
			dispatch(authActions.setMessage({ message: res.message }))
			dispatch(authActions.setSeverity({ severity: 'success' }))
			dispatch(orderAdminThunks.getAllOrders({}))
		} catch (e) {
			handleAxiosError(dispatch, e)

			return rejectWithValue(null)
		}
	}
)

const slice = createSlice({
	name: 'orderAdmin',
	initialState: {
		orders: [] as OrderAdminType[],
		order: {} as ResponseGetOrderAdminType
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getAllOrders.fulfilled, (state, action) => {
				state.orders = action.payload
			})
			.addCase(getOrder.fulfilled, (state, action) => {
				state.order = action.payload
			})
	}
})

export const orderAdminSlice = slice.reducer
export const orderAdminAction = slice.actions
export const orderAdminThunks = { getAllOrders, getOrder, updateUserOrder }
