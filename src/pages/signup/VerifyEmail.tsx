import React, { useEffect } from 'react'
import { useAppDispatch } from '../../common/hooks'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { authThunks } from '../../features/auth/auth-slice'

export const VerifyEmail = () => {
	// debugger
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const token = queryParams.get('token')

	// const token = useParams()

	useEffect(() => {
		if (token) {
			// debugger
			dispatch(authThunks.verifyEmail(token))
				.unwrap()
				.then(() => {
					navigate('/signin')
				})
			// localStorage.setItem('token', token)
		}
		navigate('/')
	}, [])

	return <div>VerifyEmail</div>
}
