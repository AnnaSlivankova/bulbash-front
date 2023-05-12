import React from 'react'
import { Badge, BadgeProps, IconButton, styled } from '@mui/material'

import Button from '@mui/material/Button'
import { InfoBlock } from '../../common/components/info-block/InfoBlock'
import { useNavigate } from 'react-router-dom'
import s from './CartPage.module.css'
import { InfoCart } from './info-cart/InfoCart'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { ProductType } from '../../features/client/products/products-types'
import { changeImgPath } from '../../common/utils/changeImgPath'
import { CartCounter } from '../../common/components/counter/cart-counter/CartCounter'
import { CartProductType } from 'features/client/cart/cart-slice'

export const CartPage = () => {
	const cartProducts = useSelector<RootState, CartProductType[]>(state => state.cart.cartProducts)
	const navigate = useNavigate()
	const redirectToCategories = () => {
		navigate('/')
	}

	var myArray = [1, 2, 3, 4, 5]
	var sum = myArray.reduce(function (acc, curr) {
		return acc + curr
	}, 0)

	const totalCount = cartProducts.reduce((acc, el) => acc + el.totalPrice, 0)

	return (
		<div>
			<InfoBlock title={'bulbash food'} description={'catering'} type={'HomePage'}>
				{/*{<Button onClick={redirectToCategories}>Назад</Button>}*/}
			</InfoBlock>

			<div className={s.wrapper}>
				<div className={s.infoContainer}>
					<div className={s.mainTitle}>Ваш заказ</div>
					{cartProducts?.map(el => {
						const image_path = changeImgPath(el.image_path)
						return (
							<InfoCart
								key={el.id}
								// image_path={image_path}
								id={el.id}
								image_path={el.image_path}
								title={el.name}
								people={el.people_numbers}
								weight={el.weight}
								price={el.price}
								count={el.count}
								totalPrice={el.totalPrice}
							/>
						)
					})}

					<Button variant='contained' color='secondary' onClick={() => navigate('/')} sx={{ m: 2 }}>
						Продолжить покупки
					</Button>
				</div>
				<div className={s.countContainer}>
					<div className={s.mainTitle}>Стоимость</div>
					<div className={s.totalPrice}>{`Итого: ${totalCount} руб.`}</div>
					<Button variant='contained' sx={{ mb: 2 }}>
						Оформить
					</Button>
				</div>
			</div>
		</div>
	)
}
