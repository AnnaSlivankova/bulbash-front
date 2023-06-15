import React from 'react'
import { Badge } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../app/store'
import { CartItemType } from '../../../cart/userCart-api'

export const CartBadge = () => {
	const cartProducts = useSelector<RootState, CartItemType[]>(state => state.userCart.userCart.data)

	return (
		<Badge badgeContent={cartProducts.length} color='secondary' max={10}>
			<ShoppingCartIcon style={{ color: 'black' }} />
		</Badge>
	)
}
