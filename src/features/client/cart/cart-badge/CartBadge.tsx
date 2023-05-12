import React from 'react'
import { Badge } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../app/store'
import { CartProductType } from '../cart-slice'

export const CartBadge = () => {
	const cartProducts = useSelector<RootState, CartProductType[]>(state => state.cart.cartProducts)

	return (
		<Badge badgeContent={cartProducts.length} color='secondary' max={10}>
			<ShoppingCartIcon style={{ color: 'black' }} />
		</Badge>
	)
}
