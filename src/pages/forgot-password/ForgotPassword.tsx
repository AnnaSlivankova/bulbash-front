import React from 'react'
import { AuthForm } from '../../common/components/auth-form/AuthForm'
import s from '../signin/Signin.module.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useActions } from '../../common/hooks'
import { authThunks } from '../../features/auth/auth-slice'

const style = {
	email: { margin: '24px 0 24px 0' }
}

export const ForgotPassword = () => {
	const { restorePassword } = useActions(authThunks)

	const { control, handleSubmit } = useForm({
		defaultValues: {
			email: ''
		}
	})
	const onSubmit: SubmitHandler<any> = data => {
		restorePassword(data)
	}

	return (
		<AuthForm title={'Восстановление пароля'}>
			{
				<form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
					<Controller
						name='email'
						control={control}
						render={({ field }) => <TextField fullWidth label='Email' variant='standard' {...field} sx={style.email} />}
					/>
					<Button type='submit' variant='contained' fullWidth>
						Восстановить пароль
					</Button>
				</form>
			}
		</AuthForm>
	)
}
