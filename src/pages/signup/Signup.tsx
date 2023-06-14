import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

// import { useActions } from '../../../common/utils/hooks/useActions'
// import { selectAuthIsSignup } from '../auth-selector'
// import { authThunks } from '../auth-slice'

import s from './Signup.module.css'
import { AuthForm } from '../../common/components/auth-form/AuthForm'
import { useActions } from '../../common/hooks'
import { authThunks } from '../../features/auth/auth-slice'

const style = {
	email: { margin: '24px 0 12px 0' },
	password: { margin: '12px 0 12px 0' },
	confPass: { margin: '12px 0 24px 0' }
}

const schema = yup
	.object({
		name: yup.string().required(),
		surname: yup.string().required(),
		email: yup.string().email().required(),
		password: yup.string().min(6).max(32).required(),
		confirm_password: yup
			.string()
			.oneOf([yup.ref('password')], "Passwords don't match")
			.required()
	})
	.required()

type FormData = yup.InferType<typeof schema>

export const Signup = () => {
	// const authIsSignup = useSelector(selectAuthIsSignup)

	const { signup } = useActions(authThunks)
	const navigate = useNavigate()

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
		const finalData = {
			name: 'name',
			surname: 'surname',
			email: data.email,
			password: data.password,
			confirm_password: data.confirm_password
		}
		signup(data)
	}

	const redirectToSigninHandler = () => {
		navigate('/signin')
	}

	// if (authIsSignup) {
	//   return <Navigate to={'/signin'} />
	// }

	return (
		<AuthForm title={'Регистрация'}>
			{
				<>
					<form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
						<TextField {...register('name')} label='Имя' fullWidth variant='standard' sx={style.email} />
						<div>{errors.name?.message}</div>
						<TextField {...register('surname')} label='Фамилия' fullWidth variant='standard' sx={style.email} />
						<div>{errors.surname?.message}</div>

						<TextField {...register('email')} label='Email' fullWidth variant='standard' sx={style.email} />
						<div>{errors.email?.message}</div>
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
							Зарегестрироваться
						</Button>
					</form>
					<div>Уже есть аккаунт?</div>
					<div onClick={redirectToSigninHandler} className={s.link}>
						Войти
					</div>
				</>
			}
		</AuthForm>
	)
}
