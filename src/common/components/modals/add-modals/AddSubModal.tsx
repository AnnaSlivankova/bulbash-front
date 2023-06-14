import React, { ChangeEvent, useState } from 'react'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// import { useActions } from '../../../../common/utils/hooks/useActions'
// import { packsThunks } from '../../packs-slice'
import { BaseModal } from '../BaseModal'

import s from './AddModal.module.css'
import { IconButton } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { CategoryDataType } from '../../../../features/admin/admin-page-types'
import { convertFileToBase64 } from '../../../utils/readImgAsBase64'
import { createFormData } from '../../../utils/createFormData'

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
export const AddSubModal: React.FC<Type> = ({ btnTitle, title, callback }) => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const { control, handleSubmit, reset, register } = useForm({
		defaultValues: {
			name: '',
			status_enabled: false,
			category_id: 0
		}
	})

	const onSubmit: SubmitHandler<any> = data => {
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
					name='name'
					control={control}
					render={({ field }) => (
						<TextField
							multiline
							fullWidth
							label='название'
							variant='outlined'
							color='secondary'
							{...field}
							// className={s.textfield}
							sx={style.textfield}
						/>
					)}
				/>
				<Controller
					name='status_enabled'
					control={control}
					render={({ field }) => (
						<label className={s.checkbox}>
							<Checkbox {...field} color='secondary' />
							статус доступности
						</label>
					)}
				/>
				<Controller
					name='category_id'
					control={control}
					render={({ field }) => (
						<TextField
							fullWidth
							label='id категории'
							type='number'
							variant='outlined'
							color='secondary'
							{...field}
							// className={s.textfield}
							sx={style.textfield}
						/>
					)}
				/>
				<Button
					type='submit'
					variant='contained'
					color='secondary'
					// className={s.btn}
					sx={style.btn}
				>
					сохранить
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
