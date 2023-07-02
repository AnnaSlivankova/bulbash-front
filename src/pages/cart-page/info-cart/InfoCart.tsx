import React, { useEffect, useState } from 'react'
import { Counter } from '../../../common/components/counter/Counter'
import ClearIcon from '@mui/icons-material/Clear'
import { IconButton } from '@mui/material'
import s from './InfoCart.module.css'
import { useActions } from '../../../common/hooks'
import { userCartThunks } from '../../../features/cart/userCart-slice'
import sprite from '../../../assets/styles/sprite.svg'

export const InfoCart: React.FC<PropsType> = ({ image_path, title, weight, price, count, id, productPrice }) => {
	const { deleteCardItem, updateCardItem } = useActions(userCartThunks)

	const deleteProductHandler = () => {
		deleteCardItem(id)
	}
	const [quantity, setQuantity] = useState<number>(count)
	const onChangeCartCount = (countValue: number) => {
		setQuantity(countValue)
	}

	useEffect(() => {
		if (count !== quantity) {
			updateCardItem({ id: id, quantity: quantity })
		}
	}, [quantity])

	return (
		<div className={s.container}>
			<img src={image_path} className={s.img} alt={`product-${id}`} />
			<div className={s.titleContainer}>
				<div className={s.title}>{title}</div>
				<div className={s.weightPeople}>{`${weight} гр.`}</div>
			</div>
			<div className={s.priceContainer}>
				<div className={s.price}>{`${price} руб.`}</div>
				<Counter count={count} callback={onChangeCartCount} />
				<div className={s.count}>{`${productPrice} руб.`}</div>
			</div>
			<svg className={s.icon} onClick={deleteProductHandler}>
				<use xlinkHref={`${sprite}#delete`} />
			</svg>
			{/*<IconButton sx={{ width: '40px', height: '40px' }} className={s.delete} onClick={deleteProductHandler}>*/}
			{/*	<ClearIcon />*/}
			{/*</IconButton>*/}
		</div>
	)
}

type PropsType = {
	image_path: string
	title: string
	weight: number
	price: number
	count: number
	id: number
	productPrice: number
}
