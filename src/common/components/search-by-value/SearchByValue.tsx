import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDebounce } from '../../hooks'
import s from './SearchByValue.module.css'
import TextField from '@mui/material/TextField'

export const SearchByValue: React.FC<PropsType> = ({ callback, searchValue, fromTo }) => {
	// const [value, setValue] = useState(searchValue)
	const [value, setValue] = useState('')
	const debouncedValue = useDebounce(value)

	const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}
	const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
		event.preventDefault()
	}

	useEffect(() => {
		callback(+debouncedValue)
	}, [debouncedValue])

	// return (
	// 	<>
	// 		<label inputMode={'numeric'} htmlFor='outlined-basic'>
	// 			{fromTo || 'от:'}
	// 		</label>
	// 		<input
	// 			id='outlined-basic'
	// 			type='number'
	// 			value={value}
	// 			onChange={onChangeValueHandler}
	// 			className={s.peopleInput}
	// 			inputMode={'numeric'}
	// 			min={0}
	// 			max={1000}
	// 		/>
	// 	</>
	// )
	return (
		<TextField
			id='outlined-basic'
			label={fromTo || 'от:'}
			variant='outlined'
			color={'secondary'}
			size={'small'}
			onChange={onChangeValueHandler}
			value={value}
			type={'number'}
			inputMode={'numeric'}
			onWheel={handleWheel}
			inputProps={{ min: 0, step: 1 }}
		/>
	)
}

type PropsType = {
	callback: (people_of_numbers: number) => void
	searchValue: string
	fromTo?: string
}
