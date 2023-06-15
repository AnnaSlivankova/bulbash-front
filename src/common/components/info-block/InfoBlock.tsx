import React, { ReactNode } from 'react'
import logo from '../../../assets/imgs/logo_res-removebg-preview.png'
import s from './InfoBlock.module.css'
import InstagramIcon from '@mui/icons-material/Instagram'
import AppleIcon from '@mui/icons-material/Apple'
import AndroidIcon from '@mui/icons-material/Android'
import TelegramIcon from '@mui/icons-material/Telegram'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { ContactsBtn } from '../contacts-btn/ContactsBtn'
import { contactsData } from '../../data/info-data'

export const InfoBlock: React.FC<InfoBlockType> = ({ title, description, children, type }) => {
	const finalClassName = type === 'HomePage' ? `${s.descriptionHP}` : `${s.description}`

	return (
		<div className={s.wrapper}>
			<div className={s.container}>
				<div className={s.medContainer}>
					<div className={s.logoContainer}>
						<img src={logo} className={s.logo} alt='logo picture' />
						<div className={s.btnsContainer}>
							<ContactsBtn>
								<InstagramIcon />
							</ContactsBtn>
							<ContactsBtn>
								<TelegramIcon />
							</ContactsBtn>
							<ContactsBtn>
								<AppleIcon />
							</ContactsBtn>
							<ContactsBtn>
								<AndroidIcon />
							</ContactsBtn>
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
								<ContactsBtn key={el.id}>
									<LocalPhoneIcon />
									<span className={s.ContactBTN}>{el.contact}</span>
								</ContactsBtn>
							)
						} else {
							return (
								<ContactsBtn key={el.id}>
									<MailOutlineIcon />
									<span className={s.ContactBTN}>{el.contact}</span>
								</ContactsBtn>
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
