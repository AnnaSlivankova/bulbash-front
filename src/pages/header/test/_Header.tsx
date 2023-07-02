import React, { useState, useEffect } from 'react'
import logo from '../../../assets/imgs/logo_res-removebg-preview.png'
import s from './_Header.module.css'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonGroup, Drawer } from '@mui/material'
import { useSelector } from 'react-redux'
import { useActions } from '../../../common/hooks'
import { RootState } from '../../../app/store'
import { authThunks } from '../../../features/auth/auth-slice'
import { CartBadge } from 'features/client/cart/cart-badge/CartBadge'
import sprite from '../../../assets/styles/sprite.svg'

export const _Header: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false) // боковое меню
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
		setIsDrawerOpen(false)
	}
	const redirectToHome = () => {
		navigate('/')
		setIsDrawerOpen(false)
	}
	const redirectToLogin = () => {
		navigate('/signin')
		setIsDrawerOpen(false)
	}
	const redirectToSignup = () => {
		navigate('/signup')
		setIsDrawerOpen(false)
	}
	const logoutHandler = () => {
		logout({})
			.unwrap()
			.then(() => {
				navigate('/home')
			})
		setIsDrawerOpen(false)
	}

	return (
		<AppBar
			position='fixed'
			style={{
				transition: 'all 0.3s ease-in-out',
				backgroundColor: isScrolled ? '#F0E56F' : 'transparent',
				boxShadow: isScrolled ? '0px 2px 5px rgba(0, 0, 0, 0.25)' : 'none'
			}}
		>
			<Toolbar>
				<Typography
					color={isScrolled ? 'black' : 'transparent'}
					style={{
						flexGrow: 1,
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
						textTransform: 'uppercase'
					}}
				>
					{isScrolled && (
						<span className={s.logoContainer} onClick={redirectToHome}>
							<img src={logo} className={s.logoSm} alt='logo' />
							<span>Bulbash</span>
						</span>
					)}
					<span onClick={redirectToHome} className={s.navItem}>
						категории
					</span>
					<span className={s.navItem}>контакты</span>
					{isScrolled && (
						<>
							{!isLogin ? (
								<div className={s.navItem}>
									<ButtonGroup variant='outlined' color='secondary' aria-label='auth button group'>
										<Button onClick={redirectToLogin}>Войти</Button>
										<Button onClick={redirectToSignup}>Зарегестрироваться</Button>
									</ButtonGroup>
								</div>
							) : (
								<div className={s.navItem}>
									<Button
										onClick={logoutHandler}
										variant='outlined'
										color='secondary'
										aria-label='logout button'
										style={{ marginRight: '10px' }}
									>
										Выйти
									</Button>

									<div onClick={redirectToCart} className={s.cart}>
										<CartBadge />
									</div>
								</div>
							)}

							<div className={s.burgAndCartMinContainer}>
								{isLogin && (
									<div onClick={redirectToCart} className={s.cart}>
										<CartBadge />
									</div>
								)}
								{/*Бургер-меню*/}
								<svg className={s.burgerIcon} onClick={() => setIsDrawerOpen(true)}>
									<use xlinkHref={`${sprite}#burger`} />
								</svg>
							</div>
						</>
					)}

					{/* Боковое меню */}
					<Drawer anchor='right' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
						<div className={s.drawer}>
							<div className={s.drawerHeader}>
								<img src={logo} className={s.logoSm} alt='logo' />
							</div>
							<div className={s.drawerLinks}>
								<div onClick={redirectToHome} className={s.drawerLink}>
									категории
								</div>
								<div onClick={redirectToHome} className={s.drawerLink}>
									контакты
								</div>
								{!isLogin ? (
									<>
										<div onClick={redirectToLogin} className={s.drawerLink}>
											Войти
										</div>
										<div onClick={redirectToSignup} className={s.drawerLink}>
											Зарегистрироваться
										</div>
									</>
								) : (
									<>
										<div onClick={redirectToCart} className={s.drawerLink}>
											Корзина
										</div>
										<div onClick={logoutHandler} className={s.drawerLink}>
											Выйти
										</div>
									</>
								)}
							</div>
						</div>
					</Drawer>
				</Typography>
			</Toolbar>
		</AppBar>
	)
}
