import React, { ChangeEvent, useState } from 'react'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

// import { useActions } from '../../../../common/utils/hooks/useActions'
// import { packsThunks } from '../../packs-slice'
import { BaseModal } from '../BaseModal'

import s from './AddModal.module.css'
import { FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { CategoryDataType } from '../../../../features/admin/admin-page-types'
import { convertFileToBase64 } from '../../../utils/readImgAsBase64'
import { createFormData } from '../../../utils/createFormData'
import { RequestPostProduct } from '../../../../features/admin/products/products-admin-api'
import { useAppSelector } from '../../../hooks'
import { ResponseFetchShortCategories } from '../../../../features/admin/categories/categories-admin-api'
import { ResponseFetchShortSubcategoryType } from '../../../../features/admin/subcategries/subcategories-admin-api'

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
	const shortCategoriesList = useAppSelector<ResponseFetchShortCategories[]>(
		state => state.adminCategories.shortCategoriesList
	)
	const shortSubcategiriesList = useAppSelector<ResponseFetchShortSubcategoryType[]>(
		state => state.adminSubcategories.shortSubcategoriesList
	)

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
		// callback(data, formData)
		callback({ ...data, category_id: +data.category_id, subcategory_id: +data.subcategory_id }, formData)
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
							label='ингридиенты'
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
							label='кол-во человек'
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
							label='цена'
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
							label='вес'
							type='number'
							variant='outlined'
							color='secondary'
							{...field}
							sx={style.textfield}
						/>
					)}
				/>
				{/*<Controller*/}
				{/*	name='category_id'*/}
				{/*	control={control}*/}
				{/*	render={({ field }) => (*/}
				{/*		<TextField*/}
				{/*			fullWidth*/}
				{/*			label='id категории'*/}
				{/*			type='number'*/}
				{/*			variant='outlined'*/}
				{/*			color='secondary'*/}
				{/*			{...field}*/}
				{/*			sx={style.textfield}*/}
				{/*		/>*/}
				{/*	)}*/}
				{/*/>*/}
				<Controller
					control={control}
					name='category_id'
					render={({ field }) => (
						<>
							<h3 style={style.btn}>Выберите категорию</h3>
							<RadioGroup row {...field}>
								{shortCategoriesList.map(el => {
									return <FormControlLabel control={<Radio />} label={el.name} value={el.id} key={el.id} />
								})}
							</RadioGroup>
						</>
					)}
				/>
				{/*<Controller*/}
				{/*	name='subcategory_id'*/}
				{/*	control={control}*/}
				{/*	render={({ field }) => (*/}
				{/*		<TextField*/}
				{/*			fullWidth*/}
				{/*			label='id подкатегории'*/}
				{/*			type='number'*/}
				{/*			variant='outlined'*/}
				{/*			color='secondary'*/}
				{/*			{...field}*/}
				{/*			sx={style.textfield}*/}
				{/*		/>*/}
				{/*	)}*/}
				{/*/>*/}
				<Controller
					control={control}
					name='subcategory_id'
					render={({ field }) => (
						<>
							<h3 style={style.btn}>Выберите подкатегорию</h3>
							<RadioGroup row {...field}>
								{shortSubcategiriesList.map(el => {
									return <FormControlLabel control={<Radio />} label={el.name} value={el.id} key={el.id} />
								})}
							</RadioGroup>
						</>
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
				<Button type='submit' variant='contained' color='secondary' sx={style.btn}>
					сохранить
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
