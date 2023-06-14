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
export const AddCatModal: React.FC<Type> = ({ btnTitle, title, callback }) => {
	// const { addPack } = useActions(packsThunks)

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const { control, handleSubmit, reset, register } = useForm({
		defaultValues: {
			name: '',
			description: '',
			status_enabled: false,
			position: 1
			// img_file: ''
		}
	})

	const defaultAva = 'no image'
	const [ava, setAva] = useState(defaultAva)
	const [formData, setFormData] = useState<FormData>(new FormData())

	const onSubmit: SubmitHandler<any> = data => {
		const finalData = { data, img_file: formData }
		callback(finalData)
		setOpen(false)
		handleClose()
		reset()
	}

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length) {
			const file = event.target.files[0]

			const formData = new FormData()
			formData.append('img_file', file, file.name)

			setFormData(formData)

			convertFileToBase64(file, (file64: string) => {
				setAva(file64)
			})
		}
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
			<div style={{ margin: '10px 0 10px 0' }}>
				<img src={ava || defaultAva} style={{ width: '100px' }} alt='picture' />
				<label>
					<input type='file' onChange={handleFileUpload} style={{ display: 'none' }} />
					<IconButton component='span'>
						<AddPhotoAlternateIcon />
					</IconButton>
				</label>
			</div>

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
					name='description'
					control={control}
					render={({ field }) => (
						<TextField
							multiline
							fullWidth
							label='описание'
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
					name='position'
					control={control}
					render={({ field }) => (
						<TextField
							fullWidth
							label='position'
							type='number'
							variant='outlined'
							color='secondary'
							{...field}
							// className={s.textfield}
							sx={style.textfield}
						/>
					)}
				/>
				{/*<IconButton component='label'>*/}
				{/*	<AddPhotoAlternateIcon />*/}
				{/*	<input type='file' accept='image/*' {...register('img_file')} style={{ display: 'none' }} />*/}
				{/*</IconButton>*/}
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
