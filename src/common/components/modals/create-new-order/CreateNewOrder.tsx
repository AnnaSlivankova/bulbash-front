import React, { useEffect, useState } from 'react'
import s from './CreateNewOrder.module.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { BaseModal } from '../BaseModal'
import Button from '@mui/material/Button'
import { FormControlLabel, Radio, RadioGroup, useMediaQuery, useTheme } from '@mui/material'
import TextField from '@mui/material/TextField'
import { RequestNewOrderType } from '../../../../features/order/order-api'
import { useActions } from '../../../hooks'
import { orderThunks } from '../../../../features/order/order-slice'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../app/store'
import { CartItemType } from '../../../../features/cart/userCart-api'
import { userCartThunks } from '../../../../features/cart/userCart-slice'
import Checkbox from '@mui/material/Checkbox'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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

const schema = yup
	.object({
		first_name: yup.string().required('Заполните поле!'),
		last_name: yup.string().required('Заполните поле!'),
		surname: yup.string().required('Заполните поле!'),
		contact_phone: yup
			.string()
			.matches(/^375(25|29|44|33|17)\d{3}\d{2}\d{2}$/, {
				message: 'Введите номер телефона в формате 375ХХХХХХХХХ'
			})
			.required('Заполните поле!'),
		contact_email: yup.string().email('Вы ввели некорректный email!'),
		delivery_address: yup.string(),
		payment_method: yup.string()
	})
	.required('Заполните поле!')

type FormData = yup.InferType<typeof schema>

export const CreateNewOrder: React.FC<Type> = ({ btnTitle, title, disabled }) => {
	const [open, setOpen] = useState(false)
	const { getCardItems } = useActions(userCartThunks)

	const [checked, setChecked] = useState(false)

	const { createNewOrder } = useActions(orderThunks)
	const cartProducts = useSelector<RootState, CartItemType[]>(state => state.userCart.userCart.data)
	const totalPrice = useSelector<RootState, number>(state => state.userCart.userCart.total_price)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const {
		control,
		handleSubmit,
		reset,
		register,
		formState: { errors }
	} = useForm<FormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			first_name: '',
			last_name: '',
			surname: '',
			contact_phone: '',
			contact_email: '',
			payment_method: 'cash',
			delivery_address: undefined
		}
	})

	const onSubmit: SubmitHandler<any> = async data => {
		const products = cartProducts?.map(({ id: cart_id, product_id, quantity, product_price: product_cost }) => ({
			cart_id,
			product_id,
			quantity,
			product_cost
		}))
		createNewOrder({
			...data,
			delivery_address: data.delivery_address || null,
			product_list: products,
			total_cost: totalPrice
		})
			.unwrap()
			.then(() => {
				setOpen(false)
				handleClose()
				reset()
			})
		// callback(data)

		// reset()
	}

	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

	// useEffect(() => {
	// 	getCardItems({})
	// }, [])

	return (
		<BaseModal
			open={open}
			handleOpen={handleOpen}
			handleClose={handleClose}
			title={title}
			button={
				<Button
					variant='contained'
					color='secondary'
					disabled={disabled}
					sx={{
						height: isSmallScreen ? 20 : 40,
						fontSize: isSmallScreen ? 10 : 18,
						padding: 0.5,
						margin: isSmallScreen ? 0 : 1
					}}
				>
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
							multiline
							fullWidth
							label='Имя*'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>
				<div className={s.errorMsg}>{errors.first_name?.message}</div>
				<Controller
					name='last_name'
					control={control}
					render={({ field }) => (
						<TextField
							multiline
							fullWidth
							label='Фамилия*'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>
				<div className={s.errorMsg}>{errors.last_name?.message}</div>
				<Controller
					name='surname'
					control={control}
					render={({ field }) => (
						<TextField
							multiline
							fullWidth
							label='Отчество*'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>
				<div className={s.errorMsg}>{errors.surname?.message}</div>
				<Controller
					name='contact_phone'
					control={control}
					render={({ field }) => (
						<TextField
							multiline
							fullWidth
							label='Номер телефона в формате 375XXXXXXXXX *'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>
				<div className={s.errorMsg}>{errors.contact_phone?.message}</div>

				<Controller
					name='contact_email'
					control={control}
					render={({ field }) => (
						<TextField
							multiline
							fullWidth
							label='Email (не обязательно)'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>
				<div className={s.errorMsg}>{errors.contact_email?.message}</div>
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
				<div className={s.errorMsg}>{errors.delivery_address?.message}</div>
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
				<div className={s.errorMsg}>{errors.payment_method?.message}</div>
				<FormControlLabel
					control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} color='primary' />}
					label='Согласие на обработку персональных данных'
				/>
				<Button type='submit' variant='contained' color='secondary' sx={style.btn} disabled={!checked}>
					оформить
				</Button>
			</form>
		</BaseModal>
	)
}

type Type = {
	btnTitle: string
	title: string
	callback?: (data: any) => void
	disabled: boolean
}
