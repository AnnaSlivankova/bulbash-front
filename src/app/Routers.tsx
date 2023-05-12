import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from 'pages/home-page/HomePage'
import { ErrorPage } from 'pages/error-page/ErrorPage'
import { ProductsPage } from 'pages/products-page/ProductsPage'
import { AdminPage } from '../pages/admin-page/AdminPage'
import { CategoriesAdmin } from '../features/admin/categories/CategoriesAdmin'
import { SubcategoriesAdmin } from '../features/admin/subcategries/SubcategoriesAdmin'
import { ProductsAdmin } from '../features/admin/products/ProductsAdmin'
import { ProductPage } from '../pages/product-page/ProductPage'
import { Signin } from '../pages/signin/Signin'
import { CartPage } from '../pages/cart-page/CartPage'

export const Routers = () => {
	return (
		<Routes>
			<Route path={'/'} element={<Navigate to={'/home'} />} />
			<Route path={'/home'} element={<HomePage />} />
			<Route path={'/products'} element={<ProductsPage />} />
			<Route path={'/product'} element={<ProductPage />} />
			<Route path={'/cart'} element={<CartPage />} />
			{/*<Route path={'/products/:id'} element={<ProductPage />} />*/}
			<Route path={'/admin'} element={<AdminPage />} />
			<Route path={'/signin'} element={<Signin />} />
			<Route path={'/admin_categories'} element={<CategoriesAdmin />} />
			<Route path={'/admin_subcategories'} element={<SubcategoriesAdmin />} />
			<Route path={'/admin_products'} element={<ProductsAdmin />} />
			<Route path={'/404'} element={<ErrorPage />} />
			<Route path={'*'} element={<Navigate to={'/404'} />} />
		</Routes>
	)
}
