import React from 'react'
import { useMediaQuery, useTheme } from '@mui/material'
import Button from '@mui/material/Button'

export const ButtonBack: React.FC<Type> = ({ callback }) => {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

	const onClickButtonHandler = () => {
		callback()
	}

	return (
		<Button
			sx={{
				width: isSmallScreen ? 0 : 100,
				height: isSmallScreen ? 20 : 40,
				fontSize: isSmallScreen ? 8 : 18,
				padding: 0,
				margin: isSmallScreen ? 2 : 1
			}}
			onClick={onClickButtonHandler}
			variant='contained'
			color='secondary'
		>
			Назад
		</Button>
	)
}

type Type = {
	callback: () => void
}
