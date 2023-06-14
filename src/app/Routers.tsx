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
import { Signup } from '../pages/signup/Signup'
import { ForgotPassword } from '../pages/forgot-password/ForgotPassword'
import { CheckEmail } from '../pages/check-email/check-email'
import { VerifyToken } from '../pages/forgot-password/VerifyToken'
import { VerifyEmail } from '../pages/signup/VerifyEmail'

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
			<Route path={'/signup'} element={<Signup />} />
			<Route path={'/forgot-password'} element={<ForgotPassword />} />
			<Route path={'/check-email'} element={<CheckEmail />} />
			<Route path={'/api/v1/users/restore-password'} element={<VerifyToken />} />
			<Route path={'/api/v1/users/verify-email'} element={<VerifyEmail />} />
			<Route path={'/admin-categories'} element={<CategoriesAdmin />} />
			<Route path={'/admin-subcategories'} element={<SubcategoriesAdmin />} />
			<Route path={'/admin-products'} element={<ProductsAdmin />} />
			<Route path={'/404'} element={<ErrorPage />} />
			<Route path={'*'} element={<Navigate to={'/404'} />} />
		</Routes>
	)
}
