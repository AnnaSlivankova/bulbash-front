import React, { ReactNode } from 'react'
import { IconButton } from '@mui/material'
import s from './ContactsBtn.module.css'

export const ContactsBtn: React.FC<ContactsBtnType> = ({ children }) => {
	return (
		<IconButton color='primary' className={s.ContactBTN}>
			{children}
		</IconButton>
	)
}
type ContactsBtnType = {
	children: ReactNode
}
