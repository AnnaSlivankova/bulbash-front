import React, { useState } from 'react'

import BorderColorIcon from '@mui/icons-material/BorderColor'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { BaseModal } from '../BaseModal'

import s from './EditModal.module.css'
import { FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { convertFileToBase64 } from '../../../utils/readImgAsBase64'
import { useAppSelector } from '../../../hooks'
import { ResponseFetchShortSubcategoryType } from '../../../../features/admin/subcategries/subcategories-admin-api'
import { ResponseFetchShortCategories } from '../../../../features/admin/categories/categories-admin-api'

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

export const EditSubModal: React.FC<EditType> = ({ id, prevName, prevStatus, title, callback, category_id }) => {
	const shortCategoriesList = useAppSelector<ResponseFetchShortCategories[]>(
		state => state.adminCategories.shortCategoriesList
	)

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const { control, handleSubmit, reset, register } = useForm({
		defaultValues: {
			category_id: category_id,
			name: prevName,
			status_enabled: prevStatus
		}
	})

	const onSubmit: SubmitHandler<any> = data => {
		const modifiedData: any = {}

		if (data.name !== prevName) {
			modifiedData.name = data.name
		}
		if (data.status_enabled !== prevStatus) {
			modifiedData.status_enabled = data.status_enabled
		}
		if (data.category_id !== category_id) {
			modifiedData.category_id = data.category_id
		}

		const params = { ...modifiedData, category_id: Number(modifiedData.category_id) }
		const finaldata = { subcategory_id: id, params }

		console.log(finaldata)
		callback(id, params)
		setOpen(false)
		handleClose()
		reset(data)
	}

	return (
		<BaseModal
			open={open}
			handleOpen={handleOpen}
			handleClose={handleClose}
			title={title}
			button={<BorderColorIcon color='secondary' />}
		>
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
					control={control}
					name='category_id'
					defaultValue={category_id}
					render={({ field }) => (
						<>
							<h3 style={style.btn}>Выберите категорию</h3>
							<RadioGroup row {...field}>
								{shortCategoriesList.map(el => {
									return <FormControlLabel control={<Radio />} label={el.name} value={el.id} />
								})}
							</RadioGroup>
						</>
					)}
				/>

				<Button type='submit' variant='contained' color='secondary' sx={style.btn}>
					сохранить
				</Button>
			</form>
		</BaseModal>
	)
}

type EditType = {
	category_id: number
	id: number
	prevName: string
	title: string
	prevStatus: boolean
	callback: (id: number, data: any) => void
}
