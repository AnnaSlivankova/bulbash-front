import React from 'react'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export const Footer = () => {
	const navigate = useNavigate()
	return (
		<div>
			<div>Footer</div>
			<IconButton onClick={() => navigate('/signin')}>
				<AccountCircleIcon />
			</IconButton>
			<Button onClick={() => navigate('/admin')} color='error'>
				admin
			</Button>
		</div>
	)
}
