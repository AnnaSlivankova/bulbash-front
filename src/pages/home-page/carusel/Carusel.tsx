import React, { useState } from 'react'
import Carousel, { arrowsPlugin, autoplayPlugin, Dots } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import s from 'pages/home-page/carusel/Carusel.module.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { IconButton, useMediaQuery, useTheme } from '@mui/material'
import a from 'assets/imgs/del1.jpg'
import b from 'assets/imgs/del2.jpg'
import c from 'assets/imgs/del3.jpg'

export const Carusel = () => {
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
					}
					// {
					// 	resolve: arrowsPlugin,
					// 	options: {
					// 		arrowLeft: (
					// 			<IconButton color='secondary' size='small'>
					// 				<ArrowBackIosIcon className={s.arrow} />
					// 			</IconButton>
					// 		),
					// 		arrowRight: (
					// 			<IconButton color='secondary' size='small'>
					// 				<ArrowForwardIosIcon className={s.arrow} />
					// 			</IconButton>
					// 		),
					// 		addArrowClickHandler: true
					// 	}
					// }
				]}
				animationSpeed={1000}
				className={s.myCarousel}
			>
				{data.map((el, i) => (
					<img key={i} src={el} className={s.caruselContent} alt={`promo_${i}`} />
				))}
			</Carousel>
			<Dots value={value} onChange={handleChange} number={data.length} />
		</div>
	)
}
