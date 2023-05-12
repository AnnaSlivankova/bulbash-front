import React, { ReactNode } from 'react'
import { IconButton } from '@mui/material'

export const ContactsBtn: React.FC<ContactsBtnType> = ({ children }) => {
	return <IconButton color='primary'>{children}</IconButton>
}
type ContactsBtnType = {
	children: ReactNode
}
