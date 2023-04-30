import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from 'pages/homePage/HomePage'
import { ErrorPage } from 'pages/errorPage/ErrorPage'
import { SubcategoriesPage } from 'pages/subcategoriesPage/SubcategoriesPage'

export const Routers = () => {
	return (
		<Routes>
			<Route path={'/'} element={<Navigate to={'/home'} />} />
			<Route path={'/home'} element={<HomePage />} />
			<Route path={'/subcategories'} element={<SubcategoriesPage />} />
			<Route path={'/404'} element={<ErrorPage />} />
			<Route path={'*'} element={<Navigate to={'/404'} />} />
		</Routes>
	)
}
