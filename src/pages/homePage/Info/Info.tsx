import React from 'react'
// import logo from '../../../assets/imgs/logo-res.jpeg'
import logo from '../../../assets/imgs/logo_res-removebg-preview.png'
import s from './Info.module.css'
import styleContainer from 'common/styles/container.module.css'
import InstagramIcon from '@mui/icons-material/Instagram'
import AppleIcon from '@mui/icons-material/Apple'
import AndroidIcon from '@mui/icons-material/Android'
import TelegramIcon from '@mui/icons-material/Telegram'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import { IconButton } from '@mui/material'

export const Info = () => {
	return (
		<div className={s.wrapper}>
			<div className={s.titleWrapper}>
				{/*<div className={`${styleContainer.container} ${s.titleWrapper}`}>*/}
				<img src={logo} className={s.logo} />
				<div className={s.title}>
					<div className={s.tt}>Bulbash food</div>
					<div className={s.td}>catering</div>
				</div>
			</div>
			<div className={s.contacts}>
				<IconButton color='primary'>
					<InstagramIcon />
				</IconButton>
				<IconButton color='primary'>
					<TelegramIcon />
				</IconButton>
				<IconButton color='primary'>
					<AppleIcon />
				</IconButton>
				<IconButton color='primary'>
					<AndroidIcon />
				</IconButton>
				<div className={s.tpel}>
					<LocalPhoneIcon color='primary' />
					+375 29 000 00 00
				</div>
				<div className={s.tpel}>
					<MailOutlineIcon color='primary' />
					bulbash@gmail.com
				</div>
			</div>
		</div>
	)
}
