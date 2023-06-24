import React, { useEffect, useState } from 'react'
import s from './ProductPage.module.css'
import { InfoBlock } from '../../common/components/info-block/InfoBlock'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { ResponseFetchProduct } from '../../features/client/products/products-api'
import { useActions } from '../../common/hooks'
import { productsThunks } from '../../features/client/products/products-slice'
import { changeImgPath } from '../../common/utils/changeImgPath'
import Button from '@mui/material/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { CartCounter } from '../../common/components/counter/cart-counter/CartCounter'
import { userCartThunks } from '../../features/cart/userCart-slice'

export const ProductPage = () => {
	const product = useSelector<RootState, ResponseFetchProduct>(state => state.products.product)
	const isLogin = useSelector<RootState, boolean>(state => state.auth.isLogin)

	const navigate = useNavigate()
	const { fetchProduct } = useActions(productsThunks)
	const { addItemToCard } = useActions(userCartThunks)

	const image_path = changeImgPath(product.image_path)

	const { id } = useParams()

	const redirectToProducts = () => {
		// navigate(`/products/${product.category_id}`)
		navigate(`/products?category_id=${product.category_id}`)
	}

	const [showCartBtn, setShowCartBtn] = useState(false)
	const [count, setCount] = useState(1)
	const setCountHandler = (countValue: number) => {
		setCount(countValue)
	}

	const addToCartHandler = () => {
		setShowCartBtn(!showCartBtn)
		addItemToCard({ product_id: product.id, quantity: count })
	}

	const redirectToCart = () => {
		navigate('/cart')
	}

	useEffect(() => {
		// fetchProduct(product.id)
		fetchProduct(Number(id))
	}, [])

	return (
		<div className={s.wrapper}>
			<InfoBlock title={'bulbash food'} description={'catering'} type={'HomePage'}>
				{
					<Button onClick={redirectToProducts} variant='contained' color='secondary'>
						Назад
					</Button>
				}
			</InfoBlock>
			<div className={s.container}>
				<div className={s.leftBlock}>
					<div className={s.leftContainer}>
						<img src={image_path} className={s.img} alt='pruduct picture' />
					</div>
				</div>
				<div className={s.rightBlock}>
					<div className={s.rightContainer}>
						<div className={s.title}>{product.name}</div>
						<div className={s.description}>{product.description}</div>
						<div className={s.ingredients}>{`Состав: ${product.ingredients}`}</div>
						<div className={s.ingredients}>{`на ${product.people_numbers} чел., ${product.weight} гр.`}</div>

						{!isLogin ? (
							<div className={s.price} style={{ margin: '10px' }}>{`Цена ${product.price} руб. `}</div>
						) : (
							<div className={s.orderContainer}>
								<div className={s.price}>{`Цена ${product.price} руб. `}</div>

								<CartCounter callback={setCountHandler} count={1} />
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
				</div>
			</div>
		</div>
	)
}
