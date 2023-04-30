import React from 'react'
import 'app/App.css'
import { Layout } from 'pages/layout/Layout'
import { BrowserRouter } from 'react-router-dom'
import { Header } from 'pages/header/Header'
import { createTheme, ThemeProvider } from '@mui/material'

function App() {
	const theme = createTheme({
		palette: {
			primary: {
				main: '#F0E56F'
			},
			secondary: {
				main: '#A26B2A'
			}
		}
	})
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<Header />
				<Layout />
			</ThemeProvider>
		</BrowserRouter>
	)
}

export default App
