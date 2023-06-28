import React, { ChangeEvent } from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { SelectChangeEvent } from '@mui/material/Select'
import { MouseEventHandler } from 'react'

export const RadioButtonsFilter: React.FC<Type> = ({ data, title, callback }) => {
	// const [value, setValue] = React.useState<boolean>()
	// const handleChange = (event: SelectChangeEvent) => {
	// 	// setName(event.target.value as string)
	// 	setValue(event.target.value)
	// }

	// const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	callback(Boolean(e.currentTarget.value))
	// }

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
