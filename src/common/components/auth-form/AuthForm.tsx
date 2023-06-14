import React, { FC, ReactNode } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

const style = {
	wrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100vh', // установка минимальной высоты на весь экран
		flexWrap: 'wrap'
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		padding: ' 0 33px 35px 33px',
		backgroundColor: 'white',
		borderRadius: 10,
		boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', // добавляем тень для контейнера
		// width: 347 // задаем ширину контейнера
		// minWidth: '500px',
		width: '500px'
	}
}

export const AuthForm: FC<PropsType> = ({ children, title }) => {
	return (
		<Box sx={style.wrapper}>
			<Paper elevation={3} sx={style.container}>
				<h1 style={{ marginTop: '20px' }}>{title}</h1>
				{children}
			</Paper>
		</Box>
	)
}

type PropsType = {
	children: ReactNode
	title: string
}
