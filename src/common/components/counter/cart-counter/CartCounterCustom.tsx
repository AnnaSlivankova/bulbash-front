import React, { ChangeEvent, useEffect, useState } from 'react'
import RemoveIcon from '@mui/icons-material/Remove'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import { TextField } from '@mui/material'
import { useDebounce } from '../../../hooks'

export const CartCounterCustom: React.FC<PropsType> = ({ count, callback }) => {
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
		debugger
		setCounterValue(+e.currentTarget.value)
	}

	useEffect(() => {
		callback(debouncedValue)
	}, [debouncedValue])

	return (
		<div>
			<IconButton onClick={decCounterValue}>
				<RemoveIcon />
			</IconButton>
			<TextField type='number' value={counterValue} onChange={onChangeValueHandler}>
				{counterValue}
			</TextField>
			<IconButton onClick={incCounterValue}>
				<AddIcon />
			</IconButton>
		</div>
	)
}

type PropsType = {
	callback: (countValue: number) => void
	count: number
}
