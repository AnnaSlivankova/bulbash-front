import React, { ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import s from './CategoryCard.module.css'
import Zoom from '@mui/material/Zoom'

export const CategoryCard: React.FC<AdminCardType> = ({ children, title, description, imgPath, onClick, zoom }) => {
	return (
		<div>
			<Zoom in={zoom} style={{ transitionDuration: '500ms' }}>
				<Card sx={{ width: 300 }}>
					<CardActionArea onClick={onClick}>
						<CardMedia component='img' height='200' image={imgPath} />
						<CardContent sx={{ height: 150 }}>
							<Typography gutterBottom variant='h5' component='div' align='center' className={s.title}>
								{title}
							</Typography>
							<Typography variant='body2' color='text.secondary' className={s.description}>
								{description}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Zoom>
			{children}
		</div>
	)
}

type AdminCardType = {
	onClick?: () => void
	children?: ReactNode
	zoom: boolean
	title: string
	description: string
	imgPath: string
}
