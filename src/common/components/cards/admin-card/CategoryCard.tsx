import React, { ReactNode } from 'react'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import s from './CategoryCard.module.css'
import Zoom from '@mui/material/Zoom'
import { useMediaQuery, useTheme } from '@mui/material'

export const CategoryCard: React.FC<AdminCardType> = ({ children, title, description, imgPath, onClick, zoom }) => {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

	return (
		<div>
			<Zoom in={zoom} style={{ transitionDuration: '500ms' }}>
				<Card
					// sx={{ width: 300 }}
					sx={{
						// width: isSmallScreen ? 140 : 300
						width: isSmallScreen ? 140 : 280
					}}
				>
					<CardActionArea onClick={onClick}>
						<CardMedia
							component='img'
							height='200'
							image={imgPath}
							sx={{
								height: isSmallScreen ? 100 : 200
							}}
						/>
						<CardContent
							// sx={{ height: 150, padding: isSmallScreen ? 1 : 2 }}
							sx={{ height: isSmallScreen ? 75 : 150, padding: isSmallScreen ? 1 : 2 }}
						>
							<Typography
								gutterBottom
								variant='h5'
								component='div'
								align='center'
								className={s.title}
								sx={{
									fontSize: isSmallScreen ? 10 : 20
								}}
							>
								{title}
							</Typography>
							<Typography
								variant='body2'
								color='text.secondary'
								className={s.description}
								sx={{
									fontSize: isSmallScreen ? 8 : 20
								}}
							>
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
