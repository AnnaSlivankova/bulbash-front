import React from 'react'
import { Button, Checkbox, IconButton, TextField } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

export const _CategoriesAdmin = () => {
	const { control, handleSubmit, reset, register } = useForm({
		defaultValues: {
			name: '',
			description: '',
			status_enabled: false,
			position: 1,
			img_file: ''
		}
	})
	const onSubmit: SubmitHandler<any> = data => {
		console.log(data)
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name='name'
					control={control}
					render={({ field }) => <TextField fullWidth label='name' variant='outlined' color='secondary' {...field} />}
				/>
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<TextField fullWidth label='description' variant='outlined' color='secondary' {...field} />
					)}
				/>
				<Controller
					name='status_enabled'
					control={control}
					render={({ field }) => (
						<label>
							<Checkbox {...field} color='secondary' />
							status_enabled
						</label>
					)}
				/>
				<Controller
					name='position'
					control={control}
					render={({ field }) => (
						<TextField fullWidth label='position' type='number' variant='outlined' color='secondary' {...field} />
					)}
				/>
				<IconButton component='label'>
					<AddPhotoAlternateIcon />
					<input type='file' accept='image/*' {...register('img_file')} style={{ display: 'none' }} />
				</IconButton>
				<Button type='submit' variant='contained' color='secondary'>
					add category
				</Button>
			</form>
		</div>
	)
}
