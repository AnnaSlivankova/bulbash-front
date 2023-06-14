import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { persistor, store } from 'app/store'
import App from 'app/App'
import reportWebVitals from './reportWebVitals'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import { createTheme, ThemeProvider } from '@mui/material'

const container = document.getElementById('root')!
const root = createRoot(container)
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

root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</PersistGate>
	</Provider>
)

reportWebVitals()
