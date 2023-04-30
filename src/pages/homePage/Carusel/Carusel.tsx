import React, { useState } from 'react'
// @ts-ignore
import Carousel, { arrowsPlugin, autoplayPlugin, Dots } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import s from 'pages/homePage/Carusel/Carusel.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { IconButton } from '@mui/material'
import a from 'assets/imgs/del1.jpg'
import b from 'assets/imgs/del2.jpg'
import c from 'assets/imgs/del3.jpg'

export const Carusel = () => {
	// const data = [
	// 	{
	// 		url: 'https://images.unsplash.com/photo-1637059396175-47c6f3f77f55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
	// 	},
	// 	{
	// 		url: 'https://images.unsplash.com/photo-1605880319718-163216d8b95c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1051&q=80'
	// 	},
	// 	{
	// 		url: 'https://images.unsplash.com/photo-1610472487806-36e3f7bca240?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
	// 	}
	// ]

	const data = [a, b, c]

	const [value, setValue] = useState(0)
	const handleChange = (value: number) => {
		setValue(value)
	}

	return (
		<div className={s.wrapper}>
			<Carousel
				value={value}
				onChange={handleChange}
				plugins={[
					'centered',
					'infinite',
					{
						resolve: autoplayPlugin,
						options: { interval: 5000 }
					},
					{
						resolve: arrowsPlugin,
						options: {
							arrowLeft: (
								<IconButton color='secondary'>
									<ArrowBackIosIcon />
								</IconButton>
							),
							arrowRight: (
								<IconButton color='secondary'>
									<ArrowForwardIosIcon />
								</IconButton>
							),
							addArrowClickHandler: true
						}
					}
				]}
				animationSpeed={1000}
				className={s.myCarousel}
			>
				{data.map((el, i) => (
					<img key={i} src={el} style={{ width: '90%', height: '300px' }} />
				))}
			</Carousel>
			<Dots value={value} onChange={handleChange} number={data.length} />
		</div>
	)
}
