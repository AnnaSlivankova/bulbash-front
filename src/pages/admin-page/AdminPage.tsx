import React, { useState } from 'react'
import s from './AdminPage.module.css'
import { NavLink } from 'react-router-dom'
import { CategoriesAdmin } from '../../features/admin/categories/CategoriesAdmin'
import { SubcategoriesAdmin } from '../../features/admin/subcategries/SubcategoriesAdmin'
import { ProductsAdmin } from '../../features/admin/products/ProductsAdmin'

export const AdminPage = () => {
	const [categories, setCategories] = useState(true)
	const [subcategories, setSubcategories] = useState(false)
	const [products, setProducts] = useState(false)

	const showCategoriesHandler = () => {
		setCategories(true)
		setSubcategories(false)
		setProducts(false)
	}
	const showSubcategoriesHandler = () => {
		setSubcategories(true)
		setCategories(false)
		setProducts(false)
	}
	const showProductsHandler = () => {
		setProducts(true)
		setSubcategories(false)
		setCategories(false)
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
				{categories && <CategoriesAdmin />}
				{subcategories && <SubcategoriesAdmin />}
				{products && <ProductsAdmin />}
			</div>
		</div>
	)
}
