import React, { useState, useEffect } from 'react'
import logo from '../../assets/imgs/logo_res-removebg-preview.png'
import s from './Header.module.css'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { CartBadge } from '../../features/client/cart/cart-badge/CartBadge'
import { IconButton } from '@mui/material'

export const Header: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false)
	const navigate = useNavigate()

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

	const redirectToCart = () => {
		navigate('/cart')
	}
	const redirectToHome = () => {
		navigate('/')
	}

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
						<span className={s.logoContainer}>
							<img src={logo} className={s.logoSm} />
							<span onClick={redirectToHome}>Bulbash</span>
						</span>
					) : (
						''
					)}
					<span onClick={redirectToHome}>home</span>
					<span>about us</span>
					<span onClick={redirectToHome}>categories</span>
					<span>contacts</span>
					{isScrolled && (
						<IconButton onClick={redirectToCart} className={s.cart}>
							<CartBadge />
						</IconButton>
					)}
				</Typography>
			</Toolbar>
		</AppBar>
	)
}
