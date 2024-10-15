import React, { useEffect, useState } from 'react'
import s from './ProductPage.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { ResponseFetchProduct } from '../../features/client/products/products-api'
import { useActions } from '../../common/hooks'
import { productsThunks } from '../../features/client/products/products-slice'
import { changeImgPath } from '../../common/utils/changeImgPath'
import Button from '@mui/material/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CartCounter } from '../../common/components/counter/cart-counter/CartCounter'
import { userCartThunks } from '../../features/cart/userCart-slice'
import { ButtonBack } from '../../common/components/button-back/ButtonBack'
import { useMediaQuery, useTheme } from '@mui/material'
import { InfoBlock } from '../../common/components/info-block/InfoBlock'

export const ProductPage = () => {
	const product = useSelector<RootState, ResponseFetchProduct>(state => state.products.product)
	const { setNotification } = useActions(userCartThunks)
	const isLogin = useSelector<RootState, boolean>(state => state.auth.isLogin)

	const navigate = useNavigate()
	const { fetchProduct } = useActions(productsThunks)
	const { addItemToCard } = useActions(userCartThunks)

	const image_path = changeImgPath(product.image_path)

	const { id } = useParams()

	const redirectToProducts = () => {
		navigate(`/products?category_id=${product.category_id}`)
	}

	const [showCartBtn, setShowCartBtn] = useState(false)
	const [isDisabled, setIsDisabled] = useState(false)

	const [count, setCount] = useState(1)
	const setCountHandler = (countValue: number) => {
		setCount(countValue)
	}

	const addToCartHandler = () => {
		if (!isLogin) {
			setNotification({ msg: 'Для заказа необходимо ВОЙТИ или ЗАРЕГЕСТРИРОВАТЬСЯ!', severity: 'warning' })
			return
		}

		setShowCartBtn(!showCartBtn)
		setIsDisabled(true)
		addItemToCard({ product_id: product.id, quantity: count })
	}

	const redirectToCart = () => {
		navigate('/cart')
	}

	useEffect(() => {
		// fetchProduct(product.id)
		fetchProduct(Number(id))
	}, [])
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

	return (
		<div className={s.wrapper}>
			<InfoBlock title={'bulbash food'} description={'catering'} type={'HomePage'}>
				{<ButtonBack callback={redirectToProducts} />}
			</InfoBlock>
			<div className={s.container}>
				<div className={s.leftBlock}>
					<div className={s.leftContainer}>
						{/*<img src={image_path} className={s.img} alt='pruduct picture' />*/}
						{/*for prod img_path bellow*/}
						<img src={product.image_path} className={s.img} alt='pruduct picture' />
					</div>
				</div>
				<div className={s.rightBlock}>
					<div className={s.rightContainer}>
						<div className={s.title}>{product.name}</div>
						<div className={s.description}>{product.description}</div>
						<div className={s.ingredients}>{`Состав: ${product.ingredients}`}</div>
						<div className={s.ingredients}>{`на ${product.people_numbers} чел., ${product.weight} гр.`}</div>

						{!isLogin ? (
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<div className={s.price} style={{ margin: '10px' }}>{`Цена ${product.price} руб. `}</div>
								<Button
									variant='contained'
									onClick={addToCartHandler}
									sx={{
										fontSize: isSmallScreen ? 10 : 18
									}}
								>
									Заказать
								</Button>
								<div style={{ margin: '10px', fontSize: '12px' }}>
									Для того чтобы сделать заказ,{' '}
									<Link style={{ textDecoration: 'underline', color: '#366eff' }} to='/signin'>
										Войдите
									</Link>{' '}
									или{' '}
									<Link style={{ textDecoration: 'underline', color: '#366eff' }} to='/signup'>
										Зарегистрируйтесь
									</Link>
								</div>
							</div>
						) : (
							<div className={s.orderContainer}>
								<div className={s.price}>{`Цена ${product.price} руб. `}</div>

								<CartCounter callback={setCountHandler} count={1} isDisabled={isDisabled} />
								{showCartBtn ? (
									<Button
										variant='contained'
										color='secondary'
										onClick={redirectToCart}
										sx={{
											fontSize: isSmallScreen ? 10 : 18
										}}
									>
										в корзину
									</Button>
								) : (
									<Button
										variant='contained'
										onClick={addToCartHandler}
										sx={{
											fontSize: isSmallScreen ? 10 : 18
										}}
									>
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
