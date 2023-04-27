import React from 'react'
import { Header } from 'components/header/Header'
import { Footer } from 'components/footer/Footer'
import { Routers } from 'app/Routers'

export const Layout = () => {
	return (
		<>
			<Header />
			<Routers />
			<Footer />
		</>
	)
}
