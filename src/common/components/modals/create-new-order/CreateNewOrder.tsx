import React, { useState } from 'react'
import s from './CreateNewOrder.module.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { BaseModal } from '../BaseModal'
import Button from '@mui/material/Button'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import TextField from '@mui/material/TextField'
import { RequestNewOrderType } from '../../../../features/order/order-api'

const style = {
	checkbox: {
		width: '100%'
	},
	textfield: {
		margin: '24px 0 12px 0'
	},
	btn: {
		marginTop: '32px'
	}
}

export const CreateNewOrder: React.FC<Type> = ({ btnTitle, title, callback }) => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const { control, handleSubmit, reset, register } = useForm({
		defaultValues: {
			delivery_address: null
		} as Omit<RequestNewOrderType, 'total_cost' | 'product_list'>
	})

	const onSubmit: SubmitHandler<any> = data => {
		console.log(data)
		// const finalData = { ...data, total_cost, product_list }
		callback(data)
		setOpen(false)
		handleClose()
		reset()
	}

	return (
		<BaseModal
			open={open}
			handleOpen={handleOpen}
			handleClose={handleClose}
			title={title}
			button={
				<Button variant='contained' color='secondary'>
					{btnTitle}
				</Button>
			}
		>
			<form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
				<Controller
					name='first_name'
					control={control}
					render={({ field }) => (
						<TextField
							required
							multiline
							fullWidth
							label='Имя'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>
				<Controller
					name='last_name'
					control={control}
					render={({ field }) => (
						<TextField
							required
							multiline
							fullWidth
							label='Фамилия'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>
				<Controller
					name='surname'
					control={control}
					render={({ field }) => (
						<TextField
							required
							multiline
							fullWidth
							label='Отчество'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>
				<Controller
					name='contact_phone'
					control={control}
					render={({ field }) => (
						<TextField
							required
							multiline
							fullWidth
							label='Номер телефона'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>

				<Controller
					name='contact_email'
					control={control}
					render={({ field }) => (
						<TextField
							required
							multiline
							fullWidth
							label='Email'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>

				<Controller
					name='delivery_address'
					control={control}
					render={({ field }) => (
						<TextField
							multiline
							minRows={3}
							fullWidth
							label='Адрес доставки'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>

				<Controller
					control={control}
					name='payment_method'
					defaultValue='cash'
					render={({ field }) => (
						<>
							<h3>Выберите способ оплаты</h3>
							<RadioGroup row {...field}>
								<FormControlLabel control={<Radio />} label={'Наличные'} value={'cash'} />
								<FormControlLabel control={<Radio />} label={'Банковская карта'} value={'card'} />
							</RadioGroup>
						</>
					)}
				/>

				<Button type='submit' variant='contained' color='secondary' sx={style.btn}>
					оформить
				</Button>
			</form>
		</BaseModal>
	)
}

type Type = {
	btnTitle: string
	title: string
	callback: (data: any) => void
}
