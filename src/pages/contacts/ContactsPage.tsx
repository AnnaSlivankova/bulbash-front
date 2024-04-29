import React from 'react'
import s from './ContactsPage.module.css'
import { _InfoBlock } from '../../common/components/info-block/test/_InfoBlock'
import { Carusel } from '../home-page/carusel/Carusel'
import { CartCounter } from '../../common/components/counter/cart-counter/CartCounter'
import Button from '@mui/material/Button'

export const ContactsPage = () => {
	return (
		<div className={s.wrapper}>
			<_InfoBlock title={'bulbash food'} description={'catering'} type={'HomePage'} />

			<div className={s.container}>
				<div className={s.leftBlock}>
					<div className={s.leftContainer}>
						<img src={infoData.contacts.photo_certificate} className={s.img} alt='certificate picture' />
					</div>
				</div>
				<div className={s.rightBlock}>
					<div className={s.rightContainer}>
						<div className={s.title}>{infoData.contacts.name_organization}</div>
						<div className={s.description}>{infoData.contacts.about_me}</div>
						<div className={s.info}>{infoData.contacts.pan}</div>
						<div className={s.info}>{infoData.contacts.certificate_number}</div>
						<div className={s.info}>{infoData.contacts.issued_by}</div>
						<div className={s.info}>{infoData.contacts.commercial_register}</div>
						<div className={s.info}>{`Юридический адрес: ${infoData.contacts.organization_address}`}</div>
						<div className={s.info}>{`Физический адрес: ${infoData.contacts.physical_address}`}</div>
						<div className={s.info}>{infoData.contacts.bank_current_account}</div>
						<div className={s.info}>{infoData.contacts.bank_identification_code}</div>
						<div className={s.info}>{infoData.contacts.bank_address}</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export const infoData: Info = {
	contacts: {
		id: 1,
		name_organization: 'ИП Боборико Кирилл  Игоревич',
		phone_number_1: '+375296840940',
		phone_number_2: null,
		email: 'bulbashfood@gmail.com',
		telegram_link: 'https://t.me./Bulbashfood',
		instagram_link: 'https://www.instagram.com/kirill_babaryka/?igshid=MzRlODBiNWFlZA%3D%3D',
		app_link: 'https://foodpicasso.com/x/1456x5e7',
		pan: 'УНП 193019948',
		certificate_number: 'Номер свидетельства 0680925',
		commercial_register: 'Дата регистрации в торговом реестре 15.01.2018',
		issued_by: 'Выдан Минским горисполкомом',
		organization_address: '220066 г. Минск, ул. Голодеда 47 кв. 49',
		physical_address: '220066 г. Минск, ул. Голодеда 47 кв. 49',
		photo_certificate: 'https://bulbashfood.ru/media/certificate/certificate_ip.jpg',
		bank_current_account: 'р/с BY89ALFA30132D71980010270000',
		bank_identification_code: 'BIC-ALFABY2X УНП 101541947, ОКПО 37526626',
		bank_address: 'в ЗАО «Альфа-Альфа-банк» 220013 г.Минск  ул.Сурганова43 47',
		about_me:
			'Bulbashfood  - кейтеринговая компания, специализирующаяся на предоставлении качественной и вкусной еды для различных мероприятий будь то: банкет, фуршет, свадьба или день рождения дома в кругу семьи . Мы готовим и доставляем готовые боксы с разнообразными блюдами, которые подходят как для корпоративных встреч, так и для частных мероприятий.\n\nНаша команда опытных поваров и кулинаров тщательно подбирает ингредиенты и разрабатывает меню, чтобы удовлетворить самые изысканные вкусы наших клиентов. Мы следим за качеством продуктов, приготовлением и оформлением блюд, чтобы каждый заказчик получил не только вкусное, но и красиво поданное блюдо.\n\nМы также предлагаем услугу доставки наших готовых боксов прямо к вашему месту проведения мероприятия или офису, что делает процесс заказа еды удобным и беззаботным для наших клиентов.\n\nBulbashfood готова порадовать вас и ваших гостей вкусной едой, профессиональным обслуживанием и индивидуальным подходом к каждому заказу. Позвольте нам сделать ваше мероприятие запоминающимся и вкусным!',
		date_created: '2024-04-27T18:08:11.881158+00:00',
		date_updated: '2024-04-27T18:08:11.881158+00:00'
	}
}

type Info = {
	contacts: ContactsFull
}
type ContactsFull = {
	id: number
	name_organization: string
	phone_number_1: string
	phone_number_2?: any
	email: string
	telegram_link: string
	instagram_link: string
	app_link: string
	pan: string
	certificate_number: string
	commercial_register: string
	issued_by: string
	organization_address: string
	physical_address: string
	photo_certificate: string
	bank_current_account: string
	bank_identification_code: string
	bank_address: string
	about_me: string
	date_created: string
	date_updated: string
}
