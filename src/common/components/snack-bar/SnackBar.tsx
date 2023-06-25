import React from 'react'

import { AlertProps, Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { useAppDispatch } from 'common/hooks'
import { authActions, SeverityType } from '../../../features/auth/auth-slice'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export function SnackBar() {
	const error = useSelector<RootState, string | null>(state => state.auth.error)
	const message = useSelector<RootState, string | null>(state => state.auth.message)
	const severity = useSelector<RootState, SeverityType>(state => state.auth.severity)

	const dispatch = useAppDispatch()

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		dispatch(authActions.setMessage({ message: null }))
		dispatch(authActions.setError({ error: null }))
	}

	const isOpen = message !== null || error !== null

	return (
		<Snackbar open={isOpen} autoHideDuration={2500} onClose={handleClose}>
			{/*<Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>*/}
			<Alert onClose={handleClose} severity={severity}>
				{message || error}
			</Alert>
		</Snackbar>
	)
}
