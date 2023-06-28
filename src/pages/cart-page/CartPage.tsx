import React, { useEffect } from 'react'

import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import s from './CartPage.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { changeImgPath } from '../../common/utils/changeImgPath'
import { CartItemType } from '../../features/cart/userCart-api'
import { InfoCart } from './info-cart/InfoCart'
import { InfoBlock } from 'common/components/info-block/InfoBlock'
import { useActions, useAppDispatch } from '../../common/hooks'
import { CreateNewOrder } from '../../common/components/modals/create-new-order/CreateNewOrder'
import { adminCategoriesThunks } from '../../features/admin/categories/categories-admin-slice'
import { orderThunks } from '../../features/order/order-slice'
import { userCartThunks } from '../../features/cart/userCart-slice'

export const CartPage = () => {
	const cartProducts = useSelector<RootState, CartItemType[]>(state => state.userCart.userCart.data)
	const totalPrice = useSelector<RootState, number>(state => state.userCart.userCart.total_price)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { getCardItems } = useActions(userCartThunks)

	const redirectToCategories = () => {
		navigate('/')
	}
	const redirectToUserOrders = () => {
		navigate('/user-orders')
	}
	const { createNewOrder } = useActions(orderThunks)

	const onClickHandler = (data: any) => {
		const products = cartProducts.map(({ id: cart_id, product_id, quantity, product_price: product_cost }) => ({
			cart_id,
			product_id,
			quantity,
			product_cost
		}))
		createNewOrder({ ...data, product_list: products, total_cost: totalPrice })
	}

	// useEffect(() => {
	// 	getCardItems({})
	// }, [])

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
								id={el.id}
								image_path={image_path}
								title={el.name}
								weight={el.weight}
								price={el.price}
								count={el.quantity}
								productPrice={el.product_price}
							/>
						)
					})}

					<Button variant='contained' color='secondary' onClick={() => navigate('/')} sx={{ m: 2 }}>
						Продолжить покупки
					</Button>
				</div>
				<div className={s.countContainer}>
					<div className={s.mainTitle}>Стоимость</div>
					<div className={s.totalPrice}>{`Итого: ${totalPrice} руб.`}</div>
					<CreateNewOrder
						btnTitle='Оформить'
						title='Оформление заказа'
						callback={onClickHandler}
						disabled={cartProducts.length === 0}
					/>
					<div onClick={redirectToUserOrders} className={s.myOrders}>
						Мои заказы
					</div>
				</div>
			</div>
		</div>
	)
}
