import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

import s from './Signin.module.css'
import { useActions } from 'common/hooks'
import { authThunks } from '../../features/auth/auth-slice'
import { RequestLoginType } from '../../features/auth/auth-api'
import { AuthForm } from '../../common/components/auth-form/AuthForm'
import { userCartThunks } from '../../features/cart/userCart-slice'

const style = {
	email: { margin: '24px 0 12px 0' },
	password: { margin: '12px 0 24px 0' }
}

export const Signin = () => {
	// const authIsSignin = useSelector(selectAuthIsSignin)

	const { login } = useActions(authThunks)
	const { getCardItems } = useActions(userCartThunks)

	const navigate = useNavigate()

	const [passwordShown, setPasswordShown] = useState(false)
	const togglePassword = () => setPasswordShown(!passwordShown)

	const { control, handleSubmit } = useForm({
		defaultValues: {
			email: '',
			password: '',
			rememberMe: false
		}
	})
	// const onSubmit: SubmitHandler<SigninParamsType> = data => {
	const onSubmit: SubmitHandler<any> = data => {
		const finaldata = { username: data.email, password: data.password }
		login(finaldata)
			.unwrap()
			// .then(() => {
			// 	console.log(`token: ${localStorage.getItem('token')}`)
			// 	getCardItems({})
			// })
			.then(() => {
				navigate('/')
			})
	}

	const redirectToForgotPwdHandler = () => navigate('/forgot-password')
	const redirectToSignupHandler = () => navigate('/signup')

	// if (authIsSignin) {
	//   return <Navigate to={'/admin'} />
	// }

	return (
		<AuthForm title={'Войти'}>
			{
				<>
					<form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
						<Controller
							name='email'
							control={control}
							render={({ field }) => (
								<TextField fullWidth label='Email' variant='standard' {...field} sx={style.email} />
							)}
						/>
						<Controller
							name='password'
							control={control}
							render={({ field }) => (
								<TextField
									fullWidth
									label='Пароль'
									type={passwordShown ? 'text' : 'password'}
									variant='standard'
									{...field}
									sx={style.password}
									InputProps={{
										endAdornment: (
											<InputAdornment position='end'>
												<IconButton onClick={togglePassword}>
													{passwordShown ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										)
									}}
								/>
							)}
						/>
						{/*<div className={s.rememberMeWrapper}>*/}
						{/*	<Controller*/}
						{/*		name='rememberMe'*/}
						{/*		control={control}*/}
						{/*		render={({ field }) => (*/}
						{/*			<label className={s.label}>*/}
						{/*				<Checkbox {...field} />*/}
						{/*				Remember me*/}
						{/*			</label>*/}
						{/*		)}*/}
						{/*	/>*/}
						{/*</div>*/}
						<div className={s.forgotPasswordWrapper}>
							<div className={s.linkFPWD} onClick={redirectToForgotPwdHandler}>
								Забыли пароль?
							</div>
						</div>
						<Button type='submit' variant='contained' fullWidth>
							Войти
						</Button>
					</form>
					<div>Еще нет аккаунта?</div>
					<div onClick={redirectToSignupHandler} className={s.linkSUP}>
						Зарегестрироваться
					</div>
				</>
			}
		</AuthForm>
	)
}
