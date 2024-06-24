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

	useEffect(() => {
		callback(+debouncedValue)
	}, [debouncedValue])

	useEffect(() => {
		if (searchValue) setValue(searchValue)
	}, [searchValue])

	// return <input type='number' value={value} onChange={onChangeValueHandler} className={s.peopleInput} />
	return (
		<TextField
			id='outlined-basic'
			label={fromTo || 'от:'}
			variant='outlined'
			color={'secondary'}
			size={'small'}
			onChange={onChangeValueHandler}
			// value={searchValue}
			value={value}
		/>
	)
}

type PropsType = {
	callback: (people_of_numbers: number) => void
	searchValue: string
	fromTo?: string
}
