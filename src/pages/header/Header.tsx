import React, { useEffect, useState } from 'react'
import logo from '../../assets/imgs/logo_res-removebg-preview.png'
import s from './Header.module.css'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonGroup, Drawer } from '@mui/material'
import { useSelector } from 'react-redux'
import { useActions, useAppSelector } from '../../common/hooks'
import { RootState } from '../../app/store'
import { authThunks } from '../../features/auth/auth-slice'
import { CartBadge } from 'features/client/cart/cart-badge/CartBadge'
import sprite from '../../assets/styles/sprite.svg'

export const Header: React.FC = () => {
	const isAdmin = useAppSelector<boolean>(state => state.auth.isAdmin)
	// const [isScrolled, setIsScrolled] = useState(false)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false) // боковое меню
	const navigate = useNavigate()
	const { logout } = useActions(authThunks)
	const isLogin = useSelector<RootState, boolean>(state => state.auth.isLogin)
	const isScrolled = true
	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		const scrollTop = window.scrollY
	// 		if (scrollTop > 50) {
	// 			setIsScrolled(true)
	// 		} else {
	// 			setIsScrolled(false)
	// 		}
	// 	}
	// 	window.addEventListener('scroll', handleScroll)
	// 	return () => {
	// 		window.removeEventListener('scroll', handleScroll)
	// 	}
	// }, [])

	const redirectToCart = () => {
		navigate('/cart')
		setIsDrawerOpen(false)
	}
	const redirectToHome = () => {
		navigate('/')
		setIsDrawerOpen(false)
	}
	const redirectToContacts = () => {
		navigate('/contacts')
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
				navigate('/')
			})
		setIsDrawerOpen(false)
	}

	const redirectToHowToOrder = () => {
		navigate('/how-to-order')
		setIsDrawerOpen(false)
	}

	const redirectToAboutUs = () => {
		navigate('/about-us')
		setIsDrawerOpen(false)
	}

	return (
		<AppBar
			position='fixed'
			style={{
				transition: 'all 0.3s ease-in-out',
				// backgroundColor: isScrolled ? '#F0E56F' : 'transparent',
				backgroundColor: '#F0E56F',
				// boxShadow: isScrolled ? '0px 2px 5px rgba(0, 0, 0, 0.25)' : 'none'
				boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)'
			}}
		>
			<Toolbar>
				<Typography
					// color={isScrolled ? 'black' : 'transparent'}
					color={'black'}
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
							<span>Bulbashfood</span>
						</span>
					)}
					<span onClick={redirectToHome} className={s.navItem}>
						категории
					</span>

					<span className={s.navItem} onClick={redirectToContacts}>
						контакты
					</span>

					<span className={s.navItem} onClick={redirectToHowToOrder}>
						доставка и оплата
					</span>

					<span className={s.navItem} onClick={redirectToAboutUs}>
						о нас
					</span>

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
									{isAdmin && (
										<svg className={s.capIcon} onClick={() => navigate('/bulbash_admin/admin')}>
											<use xlinkHref={`${sprite}#cap`} />
										</svg>
									)}
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
								{isAdmin && (
									<svg className={s.capIcon} onClick={() => navigate('/bulbash_admin/admin')}>
										<use xlinkHref={`${sprite}#cap`} />
									</svg>
								)}
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
								<div onClick={redirectToContacts} className={s.drawerLink}>
									контакты
								</div>

								<div onClick={redirectToHowToOrder} className={s.drawerLink}>
									доставка и оплата
								</div>

								<div onClick={redirectToAboutUs} className={s.drawerLink}>
									о нас
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
