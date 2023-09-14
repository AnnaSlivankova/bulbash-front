import React from 'react'
import s from './Footer.module.css'

export const Footer = () => {
	return (
		<div className={s.container}>
			<p className={s.textBox}>
				127550, Беларусь, г. Минск, ул. Прянишникова, д. 19А, стр. 1, этаж 2, пом. 1, ком. 8-15
			</p>
			<div className={s.textBox}>
				<h3>+7 (495) 221-87-34 </h3>
				<div>bulbash@gmail.com</div>
				<div>Пн-Пт 08:00-21:00 Сб-Вс 10:00-21:00</div>
			</div>
			<p className={s.textBox}>© 2023 БУЛЬБАШ — Кейтеринг.</p>
		</div>
	)
}
