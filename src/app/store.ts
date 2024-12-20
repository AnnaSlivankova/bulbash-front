import { configureStore, ThunkAction, Action, combineReducers, ThunkDispatch, AnyAction } from '@reduxjs/toolkit'
import { categoriesSlice } from 'features/client/categories/categories-slice'
import { productsSlice } from '../features/client/products/products-slice'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { adminCategoriesSlice } from '../features/admin/categories/categories-admin-slice'
import { adminSubcategoriesSlice } from '../features/admin/subcategries/subcategories-admin-slice'
import { adminProductsSlice } from '../features/admin/products/products-admin-slice'
import { productsParamsSlice } from '../features/client/products/products-params-slice'
import { cartSlice } from '../features/client/cart/cart-slice'
import { authSlice } from '../features/auth/auth-slice'
import { userCartApi } from '../features/cart/userCart-api'
import { userCartSlice } from '../features/cart/userCart-slice'
import { orderSlice } from '../features/order/order-slice'
import { orderAdminSlice } from '../features/admin/orders-admin/orders-admin-slice'
import { commonInfoSlice } from '../features/common-info/common-info-slice'

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['products', 'cart']
}

const rootReducer = combineReducers({
	categories: categoriesSlice,
	products: productsSlice,
	productsSearchParams: productsParamsSlice,
	cart: cartSlice,
	adminCategories: adminCategoriesSlice,
	adminSubcategories: adminSubcategoriesSlice,
	adminProducts: adminProductsSlice,
	adminOrders: orderAdminSlice,
	auth: authSlice,
	userCart: userCartSlice,
	order: orderSlice,
	commonInfo: commonInfoSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk]
})

export const persistor = persistStore(store)

// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
