import React, { useState, useEffect } from 'react'
import logo from '../../assets/imgs/logo_res-removebg-preview.png'
import s from './Header.module.css'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { CartBadge } from '../../features/client/cart/cart-badge/CartBadge'
import { Button, ButtonGroup, IconButton } from '@mui/material'
import { authActions, authSlice, authThunks } from '../../features/auth/auth-slice'
import { useDispatch, useSelector } from 'react-redux'
import { useActions } from '../../common/hooks'
import { RootState } from '../../app/store'

export const Header: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false)
	const navigate = useNavigate()
	const { logout } = useActions(authThunks)
	const isLogin = useSelector<RootState, boolean>(state => state.auth.isLogin)

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
	const redirectToLogin = () => {
		navigate('/signin')
	}
	const redirectToSignup = () => {
		navigate('/signup')
	}
	const logoutHandler = () => {
		logout({})
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
					{isScrolled && (
						<span className={s.logoContainer}>
							<img src={logo} className={s.logoSm} />
							<span onClick={redirectToHome}>Bulbash</span>
						</span>
					)}
					{/*<span onClick={redirectToHome}>home</span>*/}
					<span onClick={redirectToHome}>категории</span>
					{/*<span>о нас</span>*/}
					<span>контакты</span>
					{isScrolled && (
						<>
							{!isLogin ? (
								<ButtonGroup variant='outlined' color='secondary' aria-label='auth button group'>
									<Button onClick={redirectToLogin}>Войти</Button>
									<Button onClick={redirectToSignup}>Зарегестрироваться</Button>
								</ButtonGroup>
							) : (
								<>
									<Button onClick={logoutHandler} variant='outlined' color='secondary' aria-label='logout button'>
										Выйти
									</Button>
									<IconButton onClick={redirectToCart} className={s.cart}>
										<CartBadge />
									</IconButton>
								</>
							)}
						</>
					)}
				</Typography>
			</Toolbar>
		</AppBar>
	)
}
