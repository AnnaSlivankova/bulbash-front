import React, { memo } from 'react'
import Button from '@mui/material/Button'
import s from './subcategoryButton.module.css'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

export const SubcategoryButton: React.FC<SubcategoryButtonType> = ({ name, callback }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const onClickHandler = () => {
		callback()
	}

	return (
		<Button variant='outlined' color='secondary' className={s.btn} onClick={onClickHandler}>
			{name}
		</Button>
	)
}

type SubcategoryButtonType = {
	name: string
	callback: () => void
}
