import React, { ReactNode } from 'react'
import logo from '../../../assets/imgs/logo_res-removebg-preview.png'
import s from './InfoBlock.module.css'
import InstagramIcon from '@mui/icons-material/Instagram'
import AppleIcon from '@mui/icons-material/Apple'
import AndroidIcon from '@mui/icons-material/Android'
import TelegramIcon from '@mui/icons-material/Telegram'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { contactsData } from '../../data/info-data'
import { useNavigate } from 'react-router-dom'
import { IconButton } from '@mui/material'

export const InfoBlock: React.FC<InfoBlockType> = ({ title, description, children, type }) => {
	const navigate = useNavigate()
	const finalClassName = type === 'HomePage' ? `${s.descriptionHP}` : `${s.description}`

	const redirectToHomePage = () => {
		navigate('/home')
	}

	return (
		<div className={s.wrapper}>
			<div className={s.container}>
				<div className={s.medContainer}>
					<div className={s.logoContainer} onClick={redirectToHomePage}>
						<img src={logo} className={s.logo} alt='logo' />
						<div className={s.btnsContainer}>
							<IconButton color='primary'>
								<a
									target={'_blank'}
									rel='noreferrer'
									href={'https://www.instagram.com/kirill_babaryka/?igshid=MzRlODBiNWFlZA%3D%3D'}
									style={{ color: 'inherit' }}
								>
									<InstagramIcon />
								</a>
							</IconButton>
							<IconButton color='primary'>
								<a>
									<TelegramIcon />
								</a>
							</IconButton>
							<IconButton color='primary'>
								<a>
									<AppleIcon />
								</a>
							</IconButton>
							<IconButton color='primary'>
								<a>
									<AndroidIcon />
								</a>
							</IconButton>
						</div>
					</div>
					<div className={s.titleContainer}>
						<div className={s.title}>{title}</div>
						<div className={finalClassName}>{description}</div>
					</div>
				</div>
				<div className={s.contactsContainer}>
					{contactsData.map(el => {
						if (el.type === 'phone') {
							return (
								// <ContactsBtn key={el.id}>
								// 	<LocalPhoneIcon />
								// 	<span className={s.ContactBTN}>{el.contact}</span>
								// </ContactsBtn>
								<span key={el.id} className={s.ContactBTN}>
									<LocalPhoneIcon />
									<span>{el.contact}</span>
								</span>
							)
						} else {
							return (
								// <ContactsBtn key={el.id}>
								// 	<MailOutlineIcon />
								// 	<span className={s.ContactBTN}>{el.contact}</span>
								// </ContactsBtn>
								<span key={el.id} className={s.ContactBTN}>
									<MailOutlineIcon />
									<span>{el.contact}</span>
								</span>
							)
						}
					})}
				</div>
			</div>
			<div>{children}</div>
		</div>
	)
}

type InfoBlockType = {
	title: string
	description: string
	children?: ReactNode
	type?: string
}
