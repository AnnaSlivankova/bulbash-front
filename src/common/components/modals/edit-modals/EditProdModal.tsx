import React, { useState } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// import { useActions } from '../../../../common/utils/hooks/useActions'
// import { packsThunks } from '../../packs-slice'
import { BaseModal } from '../BaseModal'

import s from './EditModal.module.css'
import { IconButton } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { convertFileToBase64 } from '../../../utils/readImgAsBase64'

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

export const EditProdModal: React.FC<EditType> = ({
	id,
	prevName,
	prevStatus,
	prevDescription,
	prevIngredients,
	prevPeopleNumbers,
	prevPrice,
	prevWeight,
	prevCategoryId,
	prevSubcategoryId,
	prevImg,
	title,
	callback
}) => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const { control, handleSubmit, reset, register } = useForm({
		defaultValues: {
			name: prevName,
			description: prevDescription,
			ingredients: prevIngredients,
			people_numbers: prevPeopleNumbers,
			price: prevPrice,
			weight: prevWeight,
			category_id: prevCategoryId,
			subcategory_id: prevSubcategoryId,
			status_enabled: prevStatus
		}
	})

	const [ava, setAva] = useState(prevImg)
	const [formData, setFormData] = useState<FormData>(new FormData())

	const onSubmit: SubmitHandler<any> = data => {
		const finaldata = { data, category_id: id, img_file: formData }
		// const finaldata = { data: { name: res.name }, category_id: id }

		console.log(finaldata)
		callback(id, data, formData)
		// addPack(finalData)
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
			button={<BorderColorIcon color='secondary' />}
		>
			<div style={{ margin: '10px 0 10px 0' }}>
				<img src={ava || prevImg} style={{ width: '100px' }} alt='ava' />
				<label>
					<input type='file' onChange={handleFileUpload} style={{ display: 'none' }} />
					<IconButton component='span'>
						<AddPhotoAlternateIcon />
					</IconButton>
				</label>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} style={{ margin: '10px 0 10px 0' }} className={s.formWrapper}>
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
				<Button
					type='submit'
					variant='contained'
					color='secondary'
					// className={s.btn}
					sx={style.btn}
				>
					save
				</Button>
			</form>
		</BaseModal>
	)
}

type EditType = {
	id: number
	prevName: string
	title: string
	prevImg: string
	callback: (id: number, params: any, img_file: FormData) => void
	prevDescription: string
	prevStatus: boolean
	prevIngredients: string
	prevPeopleNumbers: number
	prevPrice: number
	prevWeight: number
	prevCategoryId: number
	prevSubcategoryId: number
}
