import { Dispatch } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { authActions } from '../../features/auth/auth-slice'

// import { appActions } from '../../app/app-slice'

export const handleAxiosError = (dispatch: Dispatch, e: unknown) => {
	const err = e as Error | AxiosError<{ error: string }>

	if (axios.isAxiosError(err)) {
		const error = err.response ? err.response.data.detail : err.message

		dispatch(authActions.setError({ error }))
	} else {
		dispatch(authActions.setError({ error: `Native error ${err.message}` }))
	}
	// dispatch(appActions.setAppStatus({ appStatus: 'failed' }))
	dispatch(authActions.setSeverity({ severity: 'error' }))
}

export type ErrorCustomType = {
	error: string
}
