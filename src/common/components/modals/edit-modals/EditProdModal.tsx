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
import { FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { convertFileToBase64 } from '../../../utils/readImgAsBase64'
import { RequestPostProduct } from '../../../../features/admin/products/products-admin-api'
import { useAppSelector } from '../../../hooks'
import { ResponseFetchShortSubcategoryType } from '../../../../features/admin/subcategries/subcategories-admin-api'
import { ResponseFetchShortCategories } from '../../../../features/admin/categories/categories-admin-api'

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

	console.log(`prevStatus: ${prevStatus}`)

	const [ava, setAva] = useState(prevImg)
	const [formData, setFormData] = useState<FormData>(new FormData())

	const onSubmit: SubmitHandler<any> = data => {
		const modifiedData: Partial<RequestPostProduct> = {}
		let modifiedImg

		if (data.name !== prevName) {
			modifiedData.name = data.name
		}
		if (data.description !== prevDescription) {
			modifiedData.description = data.description
		}
		if (data.ingredients !== prevIngredients) {
			modifiedData.ingredients = data.ingredients
		}
		if (data.people_numbers !== prevPeopleNumbers) {
			modifiedData.people_numbers = data.people_numbers
		}
		if (data.price !== prevPrice) {
			modifiedData.price = data.price
		}
		if (data.weight !== prevWeight) {
			modifiedData.weight = data.weight
		}
		if (data.category_id !== prevCategoryId) {
			modifiedData.category_id = data.category_id
		}
		if (data.subcategory_id !== prevSubcategoryId) {
			modifiedData.subcategory_id = data.subcategory_id
		}
		if (data.status_enabled !== prevStatus) {
			modifiedData.status_enabled = data.status_enabled
		}
		if (ava !== prevImg) {
			modifiedImg = formData
		}

		const finaldata = {
			data: { ...modifiedData, category_id: Number(data.category_id), subcategory_id: Number(data.subcategory_id) },
			product_id: id,
			img_file: modifiedImg
		}
		// const finaldata = { data, category_id: id, img_file: formData }

		// console.log(finaldata)
		// callback(id, data, formData)

		// product_id: number, params: any, img_file: FormData

		callback(id, modifiedData, modifiedImg)
		// callback(id, data, formData)
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
					defaultValue={prevCategoryId}
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
					defaultValue={prevSubcategoryId}
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
							<Checkbox {...field} color='secondary' checked={field.value} />
							статус доступности
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
	prevImg: string
	// callback: (id: number, params: any, img_file: FormData) => void
	callback: (id: number, params: any, img_file: any) => void
	prevDescription: string
	prevStatus: boolean
	prevIngredients: string
	prevPeopleNumbers: number
	prevPrice: number
	prevWeight: number
	prevCategoryId: number
	prevSubcategoryId: number
}
