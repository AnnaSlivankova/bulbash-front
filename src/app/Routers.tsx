import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from 'components/homePage/HomePage'
import { ErrorPage } from 'components/errorPage/ErrorPage'

export const Routers = () => {
	return (
		<Routes>
			<Route path={'/'} element={<Navigate to={'/home'} />} />
			<Route path={'/home'} element={<HomePage />} />
			<Route path={'/404'} element={<ErrorPage />} />
			<Route path={'*'} element={<Navigate to={'/404'} />} />
		</Routes>
	)
}
