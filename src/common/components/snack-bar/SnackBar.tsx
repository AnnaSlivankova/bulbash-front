import React from 'react'

import { AlertProps, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { useAppDispatch } from 'common/hooks'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function ErrorSnackbar() {
	// const error = useSelector<RootState, string | null>(state => state.app.error)
	const dispatch = useAppDispatch()

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		// dispatch(appActions.setError({ error: null }))
	}

	// const isOpen = error !== null

	return (
		// <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
		<Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity='error'>
				{/*{error}*/}
			</Alert>
		</Snackbar>
	)
}
