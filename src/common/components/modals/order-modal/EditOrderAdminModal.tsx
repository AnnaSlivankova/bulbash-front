import React, { useState } from 'react'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { BaseModal } from '../BaseModal'
import s from '../edit-modals/EditModal.module.css'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import { CategoryDataType } from '../../../../features/admin/admin-page-types'
import { RequestUpdateOrderDataType } from '../../../../features/admin/orders-admin/orders-admin-api'
import { FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material'

const style = {
	field: {
		marginBottom: '20px'
	},
	btn: {
		marginTop: '20px'
	}
}

export const EditOrderAdminModal: React.FC<Type> = ({
	id,
	title,
	prev_total_cost,
	prev_status,
	prev_payment_method,
	callback
}) => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const { control, handleSubmit, reset, register, getValues, setValue } = useForm({
		defaultValues: {
			payment_method: prev_payment_method,
			total_cost: prev_total_cost,
			status: prev_status
		}
	})

	const onSubmit: SubmitHandler<Omit<RequestUpdateOrderDataType, 'order_id'>> = data => {
		// const modifiedData: Omit<RequestUpdateOrderDataType, 'order_id'> = {} as Omit<
		// 	RequestUpdateOrderDataType,
		// 	'order_id'
		// >
		//
		// if (data.payment_method !== prev_payment_method) {
		// 	modifiedData.payment_method = data.payment_method
		// }
		// if (data.total_cost !== prev_total_cost) {
		// 	modifiedData.total_cost = data.total_cost
		// }
		// if (data.status !== prev_status) {
		// 	modifiedData.status = data.status
		// }

		const finaldata = {
			payment_method: data.payment_method,
			total_cost: +data.total_cost,
			status: data.status,
			order_id: id
		}
		console.log(finaldata)
		callback(finaldata)
		setOpen(false)
		handleClose()
		reset(data)
	}

	return (
		<BaseModal
			open={open}
			handleOpen={handleOpen}
			handleClose={handleClose}
			title={`${title} № ${id}`}
			button={
				<IconButton color='primary'>
					<BorderColorIcon color='secondary' />
				</IconButton>
			}
		>
			<form onSubmit={handleSubmit(onSubmit)} style={{ margin: '10px 0 10px 0' }} className={s.formWrapper}>
				<Controller
					control={control}
					name='payment_method'
					defaultValue={prev_payment_method}
					render={({ field }) => (
						<>
							<h3>Изменить способ оплаты</h3>
							<RadioGroup row {...field} sx={style.field}>
								<FormControlLabel control={<Radio />} label={'Наличные'} value={'cash'} />
								<FormControlLabel control={<Radio />} label={'Банковская карта'} value={'card'} />
							</RadioGroup>
						</>
					)}
				/>
				<Controller
					control={control}
					name='status'
					defaultValue={prev_status}
					render={({ field }) => (
						<>
							<h3>Изменить статус заказа</h3>
							<RadioGroup row {...field} sx={style.field}>
								<FormControlLabel control={<Radio />} label={'В обработке'} value={'pending'} />
								<FormControlLabel control={<Radio />} label={'Готовится'} value={'processing'} />
								<FormControlLabel control={<Radio />} label={'Завершен'} value={'completed'} />
								<FormControlLabel control={<Radio />} label={'Отменен'} value={'canceled'} />
							</RadioGroup>
						</>
					)}
				/>

				<Controller
					name='total_cost'
					control={control}
					render={({ field }) => (
						<TextField
							multiline
							// fullWidth
							label='Стоимость заказа'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.field}
						/>
					)}
				/>

				<Button type='submit' variant='contained' color='secondary' sx={style.btn}>
					сохранить
				</Button>
			</form>
		</BaseModal>
	)
}

type Type = {
	id: number
	title: string
	prev_payment_method: string
	prev_total_cost: number
	prev_status: string
	callback: (data: RequestUpdateOrderDataType) => void
}
