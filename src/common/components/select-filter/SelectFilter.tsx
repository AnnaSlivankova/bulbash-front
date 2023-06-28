import React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export const SelectFilter: React.FC<Type> = ({ callback, data, title }) => {
	const handleChange = (event: SelectChangeEvent) => {
		const value = +(event.target as HTMLInputElement).value
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
						<MenuItem value={el.id} key={el.id}>
							{el.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	)
}

type Type = {
	data: DataType[]
	title: string
	callback: (value: number) => void
}
type DataType = {
	id: number
	name: string
}
