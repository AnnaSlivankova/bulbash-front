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
import { useNavigate } from 'react-router-dom'
import { CartCounter } from '../../common/components/counter/cart-counter/CartCounter'
import { cartActions } from '../../features/client/cart/cart-slice'

export const ProductPage = () => {
	const product = useSelector<RootState, ResponseFetchProduct>(state => state.products.product)
	const category_id = useSelector<RootState, number>(state => state.products.category_id)
	const product_id = useSelector<RootState, number>(state => state.products.product_id)
	const navigate = useNavigate()
	const { fetchProduct } = useActions(productsThunks)
	const { setCartProduct } = useActions(cartActions)

	const image_path = changeImgPath(product.image_path)

	useEffect(() => {
		fetchProduct(product_id)
	}, [])

	const redirectToProducts = () => {
		navigate(`/products?category_id=${category_id}`)
	}

	const [showCartBtn, setShowCartBtn] = useState(false)
	const [count, setCount] = useState(1)
	const setCountHandler = (countValue: number) => {
		setCount(countValue)
		// console.log(countValue)
		// count = countValue
	}

	const addToCartHandler = () => {
		const totalPrice = count * product.price
		const cartProduct = {
			id: product.id,
			name: product.name,
			people_numbers: product.people_numbers,
			weight: product.weight,
			price: product.price,
			image_path: image_path,
			count,
			totalPrice
		}
		// console.log(count)
		setCartProduct({ cartProduct })
		setShowCartBtn(!showCartBtn)
	}

	const redirectToCart = () => {
		navigate('/cart')
	}

	return (
		<div className={s.wrapper}>
			<InfoBlock title={'bulbash food'} description={'catering'} type={'HomePage'}>
				{<Button onClick={redirectToProducts}>Назад</Button>}
			</InfoBlock>
			<div className={s.container}>
				<div className={s.leftBlock}>
					<div className={s.leftContainer}>
						<img src={image_path} className={s.img} />
					</div>
				</div>
				<div className={s.rightBlock}>
					<div className={s.rightContainer}>
						<div className={s.title}>{product.name}</div>
						<div className={s.description}>{product.description}</div>
						<div className={s.ingredients}>{`Состав: ${product.ingredients}`}</div>
						<div className={s.ingredients}>{`на ${product.people_numbers} чел., ${product.weight} гр.`}</div>

						<div className={s.orderContainer}>
							<div className={s.price}>{`Цена ${product.price} руб. `}</div>
							<CartCounter callback={setCountHandler} count={1} />
							{showCartBtn ? (
								<Button variant='contained' color='secondary' onClick={redirectToCart}>
									в корзине
								</Button>
							) : (
								<Button variant='contained' onClick={addToCartHandler}>
									Заказать
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
