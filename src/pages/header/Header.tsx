import React, { useState, useEffect } from 'react'
import logo from '../../assets/imgs/logo_res-removebg-preview.png'
import s from './Header.module.css'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export const Header: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY
			if (scrollTop > 50) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
		}
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<AppBar
			position='fixed'
			style={{
				transition: 'all 0.3s ease-in-out',
				// backgroundColor: isScrolled ? '#3d4b9a' : 'transparent',
				backgroundColor: isScrolled ? '#F0E56F' : 'transparent',
				boxShadow: isScrolled ? '0px 2px 5px rgba(0, 0, 0, 0.25)' : 'none'
			}}
		>
			<Toolbar>
				<Typography
					// variant='h6'
					color={isScrolled ? 'black' : 'transparent'}
					style={{
						flexGrow: 1,
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						textTransform: 'uppercase',
						cursor: 'pointer'
					}}
				>
					{isScrolled ? (
						<div className={s.logoContainer}>
							<img src={logo} className={s.logoSm} />
							<div>Bulbash</div>
						</div>
					) : (
						''
					)}
					<div>home</div>
					<div>about us</div>
					<div>categories</div>
					<div>contacts</div>
				</Typography>
			</Toolbar>
		</AppBar>
	)
}
