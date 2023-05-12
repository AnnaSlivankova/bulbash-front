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
import { RequestPostProduct } from '../../../../features/admin/products/products-admin-api'

const style = {
	checkbox: {
		width: '100%'
	},
	textfield: {
		margin: '10px 0 10px 0'
	},
	btn: {
		marginTop: '10px'
	}
}
export const AddProdModal: React.FC<Type> = ({ btnTitle, title, callback }) => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const { control, handleSubmit, reset, register } = useForm({
		defaultValues: {
			name: '',
			description: '',
			ingredients: '',
			people_numbers: 0,
			price: 0,
			weight: 0,
			category_id: 0,
			subcategory_id: 0,
			status_enabled: false
		}
	})

	const defaultAva = 'no image'
	const [ava, setAva] = useState(defaultAva)
	const [formData, setFormData] = useState<FormData>(new FormData())

	const onSubmit: SubmitHandler<RequestPostProduct> = data => {
		callback(data, formData)
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
				<img src={ava || defaultAva} style={{ width: '100px' }} alt='ava' />
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
							label='name'
							variant='outlined'
							color='secondary'
							{...field}
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
							label='description'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>
				<Controller
					name='ingredients'
					control={control}
					render={({ field }) => (
						<TextField
							multiline
							fullWidth
							label='ingredients'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>
				<Controller
					name='people_numbers'
					control={control}
					render={({ field }) => (
						<TextField
							fullWidth
							label='people_numbers'
							type='number'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>
				<Controller
					name='price'
					control={control}
					render={({ field }) => (
						<TextField
							fullWidth
							label='price'
							type='number'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>
				<Controller
					name='weight'
					control={control}
					render={({ field }) => (
						<TextField
							fullWidth
							label='weight'
							type='number'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>
				<Controller
					name='category_id'
					control={control}
					render={({ field }) => (
						<TextField
							fullWidth
							label='category_id'
							type='number'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>
				<Controller
					name='subcategory_id'
					control={control}
					render={({ field }) => (
						<TextField
							fullWidth
							label='subcategory_id'
							type='number'
							variant='outlined'
							color='secondary'
							{...field}
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
							status_enabled
						</label>
					)}
				/>
				<Button type='submit' variant='contained' color='secondary' sx={style.btn}>
					save
				</Button>
			</form>
		</BaseModal>
	)
}

type Type = {
	btnTitle: string
	title: string
	callback: (data: RequestPostProduct, img_file: FormData) => void
}
