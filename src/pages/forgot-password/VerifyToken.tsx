import { useAppDispatch } from 'common/hooks'
import React, { useEffect, useState } from 'react'
import { authThunks } from '../../features/auth/auth-slice'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AuthForm } from '../../common/components/auth-form/AuthForm'
import s from '../signin/Signin.module.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { RequestNewPasswordType } from '../../features/auth/auth-api'

const style = {
	password: { margin: '12px 0 12px 0' },
	confPass: { margin: '12px 0 24px 0' }
}

const schema = yup
	.object({
		password: yup.string().min(6).max(32).required(),
		confirm_password: yup
			.string()
			.oneOf([yup.ref('password')], "Passwords don't match")
			.required()
	})
	.required()

type FormData = yup.InferType<typeof schema>

export const VerifyToken = () => {
	const [isToken, setIsToken] = useState(false)
	// debugger
	// const { token } = useParams()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const token = queryParams.get('token')

	// if (token) {
	// 	localStorage.setItem('token', token)
	// 	setIsToken(true)
	// }

	const [firstPasswordShown, setFirstPasswordShown] = useState(false)
	const [secondPasswordShown, setSecondPasswordShown] = useState(false)

	const toggleFirstPassword = () => setFirstPasswordShown(!firstPasswordShown)
	const toggleSecondPassword = () => setSecondPasswordShown(!secondPasswordShown)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({
		resolver: yupResolver(schema)
	})
	const onSubmit = (data: any) => {
		const finalData: RequestNewPasswordType = {
			password: data.password,
			confirm_password: data.confirm_password,
			token: localStorage.getItem('token') as string
		}
		dispatch(authThunks.setNewPassword(finalData))
			.unwrap()
			.then(() => {
				navigate('/')
			})
	}

	useEffect(() => {
		if (token) {
			localStorage.setItem('token', token)
			setIsToken(true)
		}
	}, [])

	return (
		<>
			{!isToken ? (
				<h1>VerifyToken</h1>
			) : (
				<AuthForm title={'Восстановление пароля'}>
					{
						<form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
							<TextField
								{...register('password')}
								label='Пароль'
								fullWidth
								variant='standard'
								sx={style.password}
								type={firstPasswordShown ? 'text' : 'password'}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton onClick={toggleFirstPassword}>
												{firstPasswordShown ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
							<div>{errors.password?.message}</div>
							<TextField
								{...register('confirm_password')}
								label='Повторите пароль'
								fullWidth
								variant='standard'
								sx={style.confPass}
								type={secondPasswordShown ? 'text' : 'password'}
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton onClick={toggleSecondPassword}>
												{secondPasswordShown ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
							<div>{errors.confirm_password?.message}</div>
							<Button type='submit' variant='contained' fullWidth sx={{ mt: 5 }}>
								Отправить
							</Button>
						</form>
					}
				</AuthForm>
			)}
		</>
	)
}
