import React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export const RadioButtonsFilter: React.FC<Type> = ({ data, title, callback }) => {
	const handleRadioChange = (event: React.MouseEvent<HTMLDivElement>) => {
		const value = +(event.target as HTMLInputElement).value
		callback(Boolean(value))
	}

	return (
		<FormControl>
			<FormLabel color='secondary' id='demo-radio-buttons-group-label'>
				{title}
			</FormLabel>
			<RadioGroup
				onClick={handleRadioChange}
				// value={value}
				color='secondary'
				aria-labelledby='demo-radio-buttons-group-label'
				name='radio-buttons-group'
			>
				{data.map(el => (
					<FormControlLabel value={el.value} control={<Radio />} label={el.title} key={el.id} />
				))}
			</RadioGroup>
		</FormControl>
	)
}

type Type = {
	data: DataType[]
	title: string
	callback: (value: boolean) => void
}

type DataType = {
	title: string
	value: number
	id: number
}
