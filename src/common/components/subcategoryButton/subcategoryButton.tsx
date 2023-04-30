import React from 'react'
import Button from '@mui/material/Button'
import s from './subcategoryButton.module.css'

export const SubcategoryButton: React.FC<SubcategoryButtonType> = ({ name }) => {
	return (
		<Button variant='outlined' color='primary' className={s.btn}>
			{name}
		</Button>
	)
}

type SubcategoryButtonType = {
	name: string
}
