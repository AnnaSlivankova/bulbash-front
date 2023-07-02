import React, { ReactNode } from 'react'
import logo from '../../../../assets/imgs/logo_res-removebg-preview.png'
import s from './_InfoBlock.module.css'
import InstagramIcon from '@mui/icons-material/Instagram'
import AppleIcon from '@mui/icons-material/Apple'
import AndroidIcon from '@mui/icons-material/Android'
import TelegramIcon from '@mui/icons-material/Telegram'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { contactsData } from '../../../data/info-data'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import sprite from '../../../../assets/styles/sprite.svg'

export const _InfoBlock: React.FC<InfoBlockType> = ({ title, description, children, type }) => {
	const navigate = useNavigate()
	const finalClassName = type === 'HomePage' ? `${s.descriptionHP}` : `${s.description}`

	const redirectToHomePage = () => {
		navigate('/home')
	}

	return (
		<div className={s.wrapper}>
			<div className={s.mainContainer}>
				<div className={s.logoAndSocialContainer}>
					<img src={logo} className={s.logo} alt='logo' onClick={redirectToHomePage} />
					<div className={s.socialContainer}>
						<a
							target={'_blank'}
							rel='noreferrer'
							href={'https://www.instagram.com/kirill_babaryka/?igshid=MzRlODBiNWFlZA%3D%3D'}
							style={{ color: 'inherit' }}
						>
							<svg className={s.iconMedia}>
								<use xlinkHref={`${sprite}#ios`} />
							</svg>
						</a>

						<a target={'_blank'} rel='noreferrer' href={'https://t.me./Bulbashfood'} style={{ color: 'inherit' }}>
							<svg className={s.iconMedia}>
								<use xlinkHref={`${sprite}#instagram`} />
							</svg>
						</a>

						<a
							target={'_blank'}
							rel='noreferrer'
							href={'https://foodpicasso.com/x/1456x5e7'}
							style={{ color: 'inherit' }}
						>
							<svg className={s.iconMedia}>
								<use xlinkHref={`${sprite}#telegram`} />
							</svg>
						</a>
					</div>
				</div>
				<div className={s.titleAdnContactsWrapper}>
					<div className={s.titleContainer}>
						<div className={s.title}>{title}</div>
						<div className={finalClassName}>{description}</div>
					</div>
					<div className={s.contactsContainer}>
						{contactsData.map(el => {
							if (el.type === 'phone') {
								return (
									<span key={el.id} className={s.contact}>
										<svg className={s.iconContacts}>
											<use xlinkHref={`${sprite}#phone`} />
										</svg>
										<span>{el.contact}</span>
									</span>
								)
							} else {
								return (
									<span key={el.id} className={s.contact}>
										<svg className={s.iconContacts}>
											<use xlinkHref={`${sprite}#mail`} />
										</svg>
										<span>{el.contact}</span>
									</span>
								)
							}
						})}
					</div>
					<div className={s.childrenContainer}>{children}</div>
				</div>
			</div>
		</div>
	)
}

type InfoBlockType = {
	title: string
	description: string
	children?: ReactNode
	type?: string
}
