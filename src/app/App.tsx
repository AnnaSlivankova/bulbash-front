import React, { useEffect } from 'react'
import 'app/App.css'
import { Layout } from 'pages/layout/Layout'
import { BrowserRouter, Navigate } from 'react-router-dom'
import { Header } from 'pages/header/Header'
import { SnackBar } from '../common/components/snack-bar/SnackBar'
import { authThunks } from '../features/auth/auth-slice'
import { useAppDispatch, useAppSelector } from '../common/hooks'
import { CookieConsent } from 'react-cookie-consent'
import { _Header } from '../pages/header/test/_Header'
import { AdminPage } from '../pages/admin-page/AdminPage'
import { Footer } from '../pages/footer/Footer'

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(authThunks.me())
	}, [])

	return (
		<BrowserRouter>
			<CookieConsent buttonText='Принять' overlay={true} buttonStyle={{ backgroundColor: '#F0E56F' }}>
				Наш сайт использует файлы cookie для улучшения пользовательского опыта, сбора статистики и представления
				персонализированных рекомендаций. Нажав «Принять», вы даете согласие на обработку файлов cookie в соответствии с
				Политикой обработки файлов cookie.
			</CookieConsent>
			<SnackBar />
			{/*<Header />*/}
			<_Header />
			<Layout />
			<Footer />
		</BrowserRouter>
	)
}

export default App
