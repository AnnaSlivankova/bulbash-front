import React from 'react'
import { Carusel } from 'pages/homePage/Carusel/Carusel'
import { Categories } from 'features/categories/Categories'
import { Info } from 'pages/homePage/Info/Info'

export const HomePage = () => {
	return (
		<>
			<Info />
			<Carusel />
			<Categories />
		</>
	)
}
