import React, { ChangeEvent, useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import s from './Counter.module.css'
import { useDebounce } from '../../hooks'

export const Counter: React.FC<PropsType> = ({ count, callback }) => {
	const [counterValue, setCounterValue] = useState(count)
	const debouncedValue = useDebounce(counterValue)

	const incCounterValue = () => {
		setCounterValue(prevCount => prevCount + 1)
	}
	const decCounterValue = () => {
		if (counterValue > 1) {
			setCounterValue(prevCount => prevCount - 1)
		}
	}

	const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setCounterValue(+e.currentTarget.value)
	}

	useEffect(() => {
		callback(debouncedValue)
	}, [debouncedValue])

	return (
		<div className={s.counterContainer}>
			<div className={s.counter}>
				<IconButton onClick={decCounterValue}>
					<RemoveIcon />
				</IconButton>
				<input type='number' value={counterValue} className={s.counterInput} onChange={onChangeValueHandler} />
				<IconButton onClick={incCounterValue}>
					<AddIcon />
				</IconButton>
			</div>
			{/*<Button variant='contained'>Заказать</Button>*/}
		</div>
	)
}

type PropsType = {
	count: number
	callback: (countValue: number) => void
}
