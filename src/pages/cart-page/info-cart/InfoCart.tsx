import React, { useState } from 'react'
import { Counter } from '../../../common/components/counter/Counter'
import ClearIcon from '@mui/icons-material/Clear'
import { IconButton } from '@mui/material'
import s from './InfoCart.module.css'
import { CartCounter } from '../../../common/components/counter/cart-counter/CartCounter'
import { useActions } from '../../../common/hooks'
import { cartActions } from '../../../features/client/cart/cart-slice'
import { CartCounterCustom } from '../../../common/components/counter/cart-counter/CartCounterCustom'

export const InfoCart: React.FC<PropsType> = ({ image_path, title, people, weight, price, count, id, totalPrice }) => {
	const { deleteCartProduct, setCartProduct } = useActions(cartActions)
	const deleteProductHandler = () => {
		deleteCartProduct({ id })
	}

	// const [totalCartPrice, setTotalPrice] = useState(totalPrice)

	const setCartProductHandler = (countValue: number) => {
		const totalCartPrice = countValue * price
		setCartProduct({
			cartProduct: {
				id,
				name: title,
				count: countValue,
				price,
				weight,
				image_path,
				people_numbers: people,
				totalPrice: totalCartPrice
			}
		})
	}

	const setTotalCounts = () => {}

	return (
		<div className={s.container}>
			<img src={image_path} className={s.img} />
			<div className={s.titleContainer}>
				<div className={s.title}>{title}</div>
				<div className={s.weightPeople}>{`на ${people} чел., ${weight} гр.`}</div>
			</div>
			<div className={s.priceContainer}>
				<div className={s.price}>{`${price} руб.`}</div>
				<CartCounter callback={setCartProductHandler} count={count} />
				{/*<CartCounterCustom callback={setCartProductHandler} count={count} />*/}
				<div className={s.count}>{`${totalPrice} руб.`}</div>
				{/*<div className={s.count}>{`${totalCartPrice} руб.`}</div>*/}
			</div>
			<IconButton sx={{ width: '40px', height: '40px' }} className={s.delete} onClick={deleteProductHandler}>
				<ClearIcon />
			</IconButton>
		</div>
	)
}

type PropsType = {
	image_path: string
	title: string
	people: number
	weight: number
	price: number
	count: number
	id: number
	totalPrice: number
}
