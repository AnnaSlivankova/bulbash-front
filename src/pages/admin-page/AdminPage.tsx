import React, { useEffect, useState } from 'react'
import s from './AdminPage.module.css'
import { CategoriesAdmin } from '../../features/admin/categories/CategoriesAdmin'
import { SubcategoriesAdmin } from '../../features/admin/subcategries/SubcategoriesAdmin'
import { ProductsAdmin } from '../../features/admin/products/ProductsAdmin'
import { OrdersAdmin } from '../../features/admin/orders-admin/OrdersAdmin'
import { useActions, useAppSelector } from '../../common/hooks'
import { adminCategoriesThunks } from '../../features/admin/categories/categories-admin-slice'
import { adminSubcategoriesThunks } from '../../features/admin/subcategries/subcategories-admin-slice'
import { Navigate } from 'react-router-dom'

export const AdminPage = () => {
	const { fetchShortCategoriesList } = useActions(adminCategoriesThunks)
	const { fetchShortSubcategoriesList } = useActions(adminSubcategoriesThunks)

	const isAdmin = useAppSelector<boolean>(state => state.auth.isAdmin)

	const [categories, setCategories] = useState(false)
	const [subcategories, setSubcategories] = useState(false)
	const [products, setProducts] = useState(false)
	const [orders, setOrders] = useState(true)

	const showCategoriesHandler = () => {
		setCategories(true)
		setSubcategories(false)
		setProducts(false)
		setOrders(false)
	}
	const showSubcategoriesHandler = () => {
		setSubcategories(true)
		setCategories(false)
		setProducts(false)
		setOrders(false)
	}
	const showProductsHandler = () => {
		setProducts(true)
		setSubcategories(false)
		setCategories(false)
		setOrders(false)
	}
	const showOrdersHandler = () => {
		setOrders(true)
		setProducts(false)
		setSubcategories(false)
		setCategories(false)
	}

	useEffect(() => {
		fetchShortCategoriesList({})
		fetchShortSubcategoriesList({})
	}, [])

	if (!isAdmin) {
		return <Navigate to={'/home'} />
	}

	return (
		<div className={s.wrapper}>
			<h1>Страница администратора</h1>
			<div className={s.linksContainer}>
				{/*<div className={`${s.link} ${s.active}`}>*/}
				{/*	<NavLink to={'/admin-categories'}>Categories</NavLink>*/}
				{/*</div>*/}
				{/*<div className={`${s.link} ${s.active}`}>*/}
				{/*	<NavLink to={'/admin-subcategories'}>Subcategories</NavLink>*/}
				{/*</div>*/}
				{/*<div className={`${s.link} ${s.active}`}>*/}
				{/*	<NavLink to={'/admin-products'}>Products</NavLink>*/}
				{/*</div>*/}
				{/*<div className={`${s.link} ${s.active}`} onClick={showCategoriesHandler}>*/}
				<div className={orders ? s.activeLink : s.link} onClick={showOrdersHandler}>
					Заказы
				</div>
				<div className={categories ? s.activeLink : s.link} onClick={showCategoriesHandler}>
					Категории
				</div>
				<div className={subcategories ? s.activeLink : s.link} onClick={showSubcategoriesHandler}>
					Подкатегории
				</div>
				<div className={products ? s.activeLink : s.link} onClick={showProductsHandler}>
					Продукты
				</div>
			</div>
			<div>
				{orders && <OrdersAdmin />}
				{categories && <CategoriesAdmin />}
				{subcategories && <SubcategoriesAdmin />}
				{products && <ProductsAdmin />}
			</div>
		</div>
	)
}
