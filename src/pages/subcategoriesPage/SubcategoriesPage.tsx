import React from 'react'
import s from './SubcategoriesPage.module.css'

export const SubcategoriesPage = () => {
	return (
		<div className={s.wrapper}>
			<div style={{ width: '300px', backgroundColor: 'pink' }}>Filter</div>
			<div style={{ width: '100%', backgroundColor: 'yellow' }}>Items</div>
		</div>
	)
}
