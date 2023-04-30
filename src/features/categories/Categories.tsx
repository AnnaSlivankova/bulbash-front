import React, { useEffect, useState } from 'react'
import { useActions } from 'common/hooks'
import { categoriesThunks } from 'features/categories/categories-slice'
import { useSelector } from 'react-redux'
import { selectCategories } from 'features/categories/categories-selectors'
import s from './Categories.module.css'
import styleContainer from '../../common/styles/container.module.css'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Zoom from '@mui/material/Zoom'
import { useNavigate } from 'react-router-dom'

export const Categories = () => {
	const { fetchCategories } = useActions(categoriesThunks)
	const categories = useSelector(selectCategories)
	const navigate = useNavigate()

	const [zoom, setZoom] = useState(false)

	useEffect(() => {
		fetchCategories({})
		setZoom(true)
	}, [])

	const redirectToSub = () => {
		navigate('/subcategories')
	}

	return (
		<div className={s.wrapper}>
			<h1>HELLO</h1>
			<div className={`${styleContainer.container} ${s.container}`}>
				{categories.map(el => {
					const imgPath = 'http://' + el.image_path

					return (
						<Zoom in={zoom} style={{ transitionDuration: '500ms' }}>
							<Card key={el.id} sx={{ width: 300 }} className={s.card} onClick={redirectToSub}>
								<CardActionArea>
									<CardMedia component='img' height='200' image={imgPath} alt={el.name} />
									<CardContent sx={{ height: '120px' }}>
										<Typography gutterBottom variant='h5' component='div' align='center' className={s.title}>
											{el.name}
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											{el.description}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</Zoom>
					)
				})}
			</div>
		</div>
	)
}
