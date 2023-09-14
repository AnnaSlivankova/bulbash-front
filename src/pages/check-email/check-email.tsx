import React from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { AuthForm } from '../../common/components/auth-form/AuthForm'

export const CheckEmail = () => {
	const navigate = useNavigate()

	const redirectToHomeHandler = () => {
		navigate('/')
	}

	return (
		<AuthForm title={'Проверьте почту'}>
			{
				<>
					<p style={{ margin: '20px 0 20px 0', textAlign: 'center' }}>
						Вы запросили восстановление пароля для вашей учетной записи. Для завершения процедуры, пожалуйста, проверьте
						свою электронную почту на наличие письма от нашей службы поддержки.
					</p>
					<Button type={'submit'} variant='contained' onClick={redirectToHomeHandler}>
						назад
					</Button>
				</>
			}
		</AuthForm>
	)
}
