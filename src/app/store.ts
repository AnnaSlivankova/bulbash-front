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
	adminProducts: adminProductsSlice
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

// import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
// import { categoriesSlice } from 'features/categories/categories-slice'
// import { productsSlice } from '../features/products/products-slice'
//
// export const store = configureStore({
// 	reducer: {
// 		categories: categoriesSlice,
// 		products: productsSlice
// 	}
// })
//
// export type AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
//
