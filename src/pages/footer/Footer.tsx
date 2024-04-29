import React from 'react'
import s from './Footer.module.css'

export const Footer = () => {
	return (
		<div className={s.container}>
			<p className={s.textBox}>ИП Боборико Кирилл Игоревич, УНП 193019948, 220066 г. Минск, ул. Голодеда 47 кв. 49</p>
			<p className={s.textBox}>
				р/с BY89ALFA30132D71980010270000 BIC-ALFABY2X УНП 101541947, ОКПО 37526626 в ЗАО «Альфа-Альфа-банк» 220013
				г.Минск ул.Сурганова43 47
			</p>
			<div className={s.textBox}>
				<h3>+375 29 684 09 40</h3>
				<div>bulbashfood@gmail.com</div>
				<div>Пн-Пт 08:00-21:00 Сб-Вс 10:00-21:00</div>
			</div>
			<p className={s.textBox}>© 2024 ИП Боборико Кирилл Игоревич</p>
		</div>
	)
}
