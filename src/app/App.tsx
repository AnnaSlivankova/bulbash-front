import React, { useEffect } from 'react'
import 'app/App.css'
import { Layout } from 'pages/layout/Layout'
import { BrowserRouter } from 'react-router-dom'
import { Header } from 'pages/header/Header'
import { SnackBar } from '../common/components/snack-bar/SnackBar'
import { authThunks } from '../features/auth/auth-slice'
import { useAppDispatch } from '../common/hooks'

function App() {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(authThunks.me())
	}, [])

	return (
		<BrowserRouter>
			<SnackBar />
			<Header />
			<Layout />
		</BrowserRouter>
	)
}

export default App
