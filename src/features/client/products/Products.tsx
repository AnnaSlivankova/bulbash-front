import React, { useState } from 'react'
import s from './Products.module.css'
import Zoom from '@mui/material/Zoom'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { useActions, useAppDispatch } from '../../../common/hooks'
import { productsActions } from './products-slice'
import { CartCounter } from '../../../common/components/counter/cart-counter/CartCounter'
import { cartActions } from '../cart/cart-slice'
import { userCartThunks } from '../../cart/userCart-slice'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'

export const Products: React.FC<ProductsType> = ({
	zoom,
	id,
	name,
	imgPath,
	description,
	price,
	peopleNumber,
	weight
}) => {
	const { setProductId } = useActions(productsActions)

	const { addItemToCard } = useActions(userCartThunks)

	const isLogin = useSelector<RootState, boolean>(state => state.auth.isLogin)

	const dispatch = useAppDispatch()

	const navigate = useNavigate()
	const redirectToProduct = () => {
		setProductId({ product_id: id })
		// navigate('/product')
		navigate(`/product/${id}`)
	}

	const [showCartBtn, setShowCartBtn] = useState(false)

	const [isDisabled, setIsDisabled] = useState(false)

	const [count, setCount] = useState(1)
	const setCountHandler = (countValue: number) => {
		setCount(countValue)
	}

	const addToCartHandler = () => {
		setShowCartBtn(!showCartBtn)
		setIsDisabled(true)
		addItemToCard({
			product_id: id,
			quantity: count
		})
	}

	const redirectToCart = () => {
		navigate('/cart')
	}

	return (
		<Zoom in={zoom} style={{ transitionDuration: '500ms' }}>
			<Card sx={{ width: 300 }}>
				<CardActionArea onClick={redirectToProduct}>
					<CardMedia component='img' height='200' image={imgPath} alt={name} />
					<CardContent>
						<Typography gutterBottom variant='h6' component='div' align='center' className={s.title}>
							{name}
						</Typography>
						<Typography variant='body2' color='text.secondary' className={s.description}>
							{description}
						</Typography>
					</CardContent>
				</CardActionArea>
				<div className={s.subContainer}>
					<div className={s.sub}>
						<Typography variant='h6' color='text.secondary'>
							{`${price} byn`}
						</Typography>
						<Typography variant='subtitle1' color='text.secondary'>
							{`на ${peopleNumber} чел., ${weight} гр.`}
						</Typography>
					</div>
					{isLogin && (
						<div className={s.counter}>
							<CartCounter callback={setCountHandler} count={1} isDisabled={isDisabled} />
							{showCartBtn ? (
								<Button variant='contained' color='secondary' onClick={redirectToCart}>
									в корзину
								</Button>
							) : (
								<Button variant='contained' onClick={addToCartHandler}>
									Заказать
								</Button>
							)}
						</div>
					)}
				</div>
			</Card>
		</Zoom>
	)
}

type ProductsType = {
	zoom: boolean
	id: number
	imgPath: string
	name: string
	description: string
	price: number
	peopleNumber: number
	weight: number
}
