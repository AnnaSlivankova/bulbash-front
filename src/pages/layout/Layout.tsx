import React from 'react'
import { Header } from 'pages/header/Header'
import { Footer } from 'pages/footer/Footer'
import { Routers } from 'app/Routers'
import { AdminPage } from '../admin-page/AdminPage'
import { useAppSelector } from '../../common/hooks'

export const Layout = () => {
	return (
		<div style={{ marginTop: '56px' }}>
			{/*<Header />*/}
			<Routers />
			{/*<Footer />*/}
		</div>
	)
}
