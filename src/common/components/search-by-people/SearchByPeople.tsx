import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDebounce } from '../../hooks'
import s from './SearchByPeople.module.css'

export const SearchByPeople: React.FC<PropsType> = ({ callback, searchValue }) => {
	const [value, setValue] = useState(searchValue)
	const debouncedValue = useDebounce(value)

	const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}

	useEffect(() => {
		callback(+debouncedValue)
	}, [debouncedValue])

	return <input type='number' value={value} onChange={onChangeValueHandler} className={s.peopleInput} />
}

type PropsType = {
	callback: (people_of_numbers: number) => void
	searchValue: string
}
