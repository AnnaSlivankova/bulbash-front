import React, { memo } from 'react'
import Button from '@mui/material/Button'
import s from './subcategoryButton.module.css'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useMediaQuery, useTheme } from '@mui/material'

export const SubcategoryButton: React.FC<SubcategoryButtonType> = ({ name, callback }) => {
	const [searchParams, setSearchParams] = useSearchParams()

	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

	const onClickHandler = () => {
		callback()
	}

	return (
		<Button
			variant='outlined'
			color='secondary'
			className={s.btn}
			onClick={onClickHandler}
			sx={{
				// width: isSmallScreen ? 0 : 100,
				height: isSmallScreen ? 20 : 40,
				fontSize: isSmallScreen ? 10 : 18,
				padding: 0.5,
				margin: isSmallScreen ? 0 : 1
			}}
		>
			{name}
		</Button>
	)
}

type SubcategoryButtonType = {
	name: string
	callback: () => void
}
