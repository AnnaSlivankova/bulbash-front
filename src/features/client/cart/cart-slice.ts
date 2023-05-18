import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
	name: 'cart',
	initialState: {
		cartProducts: [] as CartProductType[]
	},
	reducers: {
		setCartProduct: (state, action: PayloadAction<{ cartProduct: CartProductType }>) => {
			const { cartProduct } = action.payload
			const index = state.cartProducts.findIndex(el => el.id === cartProduct.id)

			if (index !== -1) {
				if (state.cartProducts[index].count === cartProduct.count) {
					// debugger
					state.cartProducts[index].count = cartProduct.count
					state.cartProducts[index].totalPrice = cartProduct.totalPrice
				} else {
					// debugger
					const count = state.cartProducts[index].count
					const price = state.cartProducts[index].totalPrice

					state.cartProducts[index].count = count + cartProduct.count
					state.cartProducts[index].totalPrice = price + cartProduct.totalPrice
				}
			} else {
				state.cartProducts.push(cartProduct)
			}
		},
		increaseCartCount: (state, action: PayloadAction<{ id: number }>) => {
			const product = state.cartProducts.find(el => el.id === action.payload.id)
			// debugger
			if (product) {
				product.count++
				product.totalPrice = product.count * product.price
			}
		},
		decreaseCartCount: (state, action: PayloadAction<{ id: number }>) => {
			const product = state.cartProducts.find(el => el.id === action.payload.id)
			// debugger
			if (product && product.count > 1) {
				product.count--
				product.totalPrice = product.count * product.price
			}
		},
		onChangeCartCount: (state, action: PayloadAction<{ id: number; count: number }>) => {
			const product = state.cartProducts.find(el => el.id === action.payload.id)
			if (product) {
				product.count = action.payload.count
				product.totalPrice = product.count * product.price
			}
		},
		deleteCartProduct: (state, action: PayloadAction<{ id: number }>) => {
			state.cartProducts = state.cartProducts.filter(el => el.id !== action.payload.id)
		}
	}
})

export const cartSlice = slice.reducer
export const cartActions = slice.actions

export type CartProductType = {
	id: number
	name: string
	people_numbers: number
	weight: number
	price: number
	image_path: string
	count: number
	totalPrice: number
}
