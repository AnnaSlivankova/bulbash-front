import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import s from './Counter.module.css'

export const Counter = () => {
	const [counterValue, setCounterValue] = useState(1)
	const incCounterValue = () => {
		setCounterValue(prevCount => prevCount + 1)
	}
	const decCounterValue = () => {
		if (counterValue > 1) {
			setCounterValue(prevCount => prevCount - 1)
		}
	}

	return (
		<div className={s.counterContainer}>
			<div className={s.counter}>
				<IconButton onClick={decCounterValue}>
					<RemoveIcon />
				</IconButton>
				<input
					type='number'
					value={counterValue}
					className={s.counterInput}
					onChange={() => {
						alert('added to cart-page')
					}}
				/>
				<IconButton onClick={incCounterValue}>
					<AddIcon />
				</IconButton>
			</div>
			<Button variant='contained'>Заказать</Button>
		</div>
	)
}
