import React from 'react'
import s from './HowToOrderPage.module.css'
import { InfoBlock } from '../../common/components/info-block/InfoBlock'
import Card from '@mui/material/Card'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

export const HowToOrderPage = () => {
	return (
		<div className={s.wrapper}>
			<InfoBlock title={'bulbash food'} description={'catering'} type={'HomePage'} />

			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Card sx={{ p: 3, maxWidth: 700 }}>
					<Typography variant='h5' sx={{ textAlign: 'center', mb: '20px' }}>
						ДОСТАВКА И ОПЛАТА
					</Typography>
					<Typography variant='h6'>ДОСТАВКА</Typography>
					<Typography variant='body1'>Бесплатная доставка в пределах МКАД</Typography>
					<Typography variant='body1'>
						• Доставка за МКАД- если адрес доставки находится на ростоянии до 25 км от МКАД- стоимость доставки составит
						1 BYN за каждый 1 км удалённость от МКАД.
					</Typography>

					<Typography variant='h6'>ОПЛАТА</Typography>
					<Typography variant='body1'>• Наличными</Typography>
					<Typography variant='body1'>• Безналичным расчетом на р/с организации</Typography>

					<Typography variant='h6'>УСЛОВИЯ</Typography>
					<Typography variant='body1'>• Оформить заказ можно on-line или по телефону в любое время. </Typography>
					<Typography variant='body1'>
						• Прием и обработка заказов осуществляется с 9:00 до 21:00 часов. Минимальное время предзаказа 24 часа
					</Typography>
					<Typography variant='body1'>
						• Заказы "день-в-день" осуществляются с 9:00 до 12:00 , и доставляются до 20:00
					</Typography>
					<Typography variant='body1'>
						• В случае уведомления об отмене заказа менее чем за 24 часа до мероприятия/ доставки, взимается 50% от
						суммы всего заказа или суммы произведенной предоплаты
					</Typography>

					<Typography variant='h6'>ВАРИАНТ ДОСТАВКИ</Typography>
					<Typography variant='body1'>• Доставка в крафтовой коробке</Typography>
					<Typography variant='body1'>• Доставка в кравтовых подносах</Typography>
				</Card>
			</Box>
		</div>
	)
}
