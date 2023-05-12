import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { Slider, SliderProps } from '@mui/material'
import { useDebounce } from '../../hooks'
import { useSearchParams } from 'react-router-dom'
import { SliderInput } from './SliderInput'
import s from './Slider.module.css'

export const SliderField: React.FC<PropsType> = ({
	values,
	setValues,
	minPriceState,
	maxPriceState,
	setIsDebounced,
	onChangeCommittedHandle,
	changeSliderValuesHandler,
	title
}) => {
	return (
		<div className={s.sliderWrapper}>
			<div>{title}</div>
			<div className={s.valuesContainer}>
				<div>
					<div>от</div>
					<SliderInput
						activeThumb={0}
						value={values}
						setValue={setValues}
						min={minPriceState}
						max={maxPriceState}
						setIsDebounced={setIsDebounced}
					/>
				</div>
				<div>
					<div>до</div>
					<SliderInput
						activeThumb={1}
						value={values}
						setValue={setValues}
						min={minPriceState}
						max={maxPriceState}
						setIsDebounced={setIsDebounced}
					/>
				</div>
			</div>

			<Slider
				onChangeCommitted={onChangeCommittedHandle}
				onChange={changeSliderValuesHandler}
				value={values}
				min={minPriceState}
				max={maxPriceState}
				valueLabelDisplay='auto'
				disableSwap
			/>
		</div>
	)
}

type PropsType = {
	values: number[]
	setValues: Dispatch<SetStateAction<number[]>>
	minPriceState: number
	maxPriceState: number
	setIsDebounced: Dispatch<SetStateAction<boolean>>
	onChangeCommittedHandle: () => void
	changeSliderValuesHandler: (event: Event, value: number[] | number) => void
	title: string
}
