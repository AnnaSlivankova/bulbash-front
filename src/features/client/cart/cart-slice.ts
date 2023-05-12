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
				state.cartProducts[index].count = cartProduct.count
				state.cartProducts[index].totalPrice = cartProduct.totalPrice
			} else {
				state.cartProducts.push(cartProduct)
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
