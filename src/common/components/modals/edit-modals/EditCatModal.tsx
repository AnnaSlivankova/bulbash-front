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
import { CategoryDataType } from '../../../../features/admin/admin-page-types'

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

export const EditCatModal: React.FC<EditType> = ({
	id,
	prevName,
	prevPosition,
	prevStatus,
	prevDescription,
	prevImg,
	title,
	callback
}) => {
	// const { updatePack } = useActions(packsThunks)

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const { control, handleSubmit, reset, register, getValues, setValue } = useForm({
		defaultValues: {
			name: prevName,
			description: prevDescription,
			status_enabled: prevStatus,
			position: prevPosition
			// img_file: prevImg
		}
	})

	const [ava, setAva] = useState(prevImg)
	const [formData, setFormData] = useState<FormData>(new FormData())

	const onSubmit: SubmitHandler<any> = data => {
		const modifiedData: Partial<CategoryDataType> = {}
		let modifiedImg

		// { data: Partial<CategoryDataType>; category_id: number; img_file: FormData }

		if (data.name !== prevName) {
			modifiedData.name = data.name
		}
		if (data.description !== prevDescription) {
			modifiedData.description = data.description
		}
		if (data.status_enabled !== prevStatus) {
			modifiedData.status_enabled = data.status_enabled
		}
		if (data.position !== prevPosition) {
			modifiedData.position = data.position
		}
		if (ava !== prevImg) {
			modifiedImg = formData
		}

		const finaldata = {
			data: { ...modifiedData },
			category_id: id,
			img_file: modifiedImg
		}
		// const finaldata = { data, category_id: id, img_file: formData }

		console.log(finaldata.data)

		callback(finaldata)
		// addPack(finalData)
		setOpen(false)
		handleClose()
		reset(data)
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
				<img src={ava || prevImg} style={{ width: '100px' }} alt='picture' />
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
							<Checkbox {...field} color='secondary' checked={field.value} />
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

type EditType = {
	id: number
	prevName: string
	title: string
	prevDescription: string
	prevStatus: boolean
	prevPosition: number
	prevImg: string
	callback: (data: any) => void
}
