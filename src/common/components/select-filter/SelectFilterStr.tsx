import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ResponseFetchSubcategoryType } from '../../../features/admin/subcategries/subcategories-admin-api'
import { FetchCategoryResponseType } from '../../../features/admin/admin-page-types'

export const SelectFilterStr: React.FC<Type> = ({ callback, data, title }) => {
	const handleChange = (event: SelectChangeEvent) => {
		const value = (event.target as HTMLInputElement).value
		callback(value)
	}

	return (
		<Box sx={{ minWidth: 150 }}>
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-label' color='secondary'>
					{title}
				</InputLabel>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					// value={name}
					label={`${title}`}
					onChange={handleChange}
					color='secondary'
				>
					{data.map(el => (
						<MenuItem value={el.value} key={el.id}>
							{el.title}
						</MenuItem>
					))}
					{/*<MenuItem value={10}>Ten</MenuItem>*/}
				</Select>
			</FormControl>
		</Box>
	)
}

type Type = {
	data: DataType[]
	title: string
	callback: (value: string) => void
}
type DataType = {
	id: number
	title: string
	value: string
}
