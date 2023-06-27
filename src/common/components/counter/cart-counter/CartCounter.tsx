import React, { ChangeEvent, useEffect, useState } from 'react'
import s from './CartCounter.module.css'
import IconButton from '@mui/material/IconButton'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { useDebounce } from '../../../hooks'

export const CartCounter: React.FC<PropsType> = ({ callback, count, isDisabled }) => {
	const [counterValue, setCounterValue] = useState(count)
	const debouncedValue = useDebounce(counterValue)

	const incCounterValue = () => {
		setCounterValue(counterValue + 1)
	}
	const decCounterValue = () => {
		if (counterValue > 1) {
			setCounterValue(counterValue - 1)
		}
	}

	const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setCounterValue(+e.currentTarget.value)
	}

	useEffect(() => {
		callback(debouncedValue)
	}, [debouncedValue])

	return (
		<div className={s.counter}>
			<IconButton onClick={decCounterValue} disabled={isDisabled}>
				<RemoveIcon />
			</IconButton>
			<input
				disabled={isDisabled}
				type='number'
				value={counterValue}
				className={s.counterInput}
				onChange={onChangeValueHandler}
			/>
			<IconButton onClick={incCounterValue} disabled={isDisabled}>
				<AddIcon />
			</IconButton>
		</div>
	)
}

type PropsType = {
	callback: (countValue: number) => void
	count: number
	isDisabled?: boolean
}
