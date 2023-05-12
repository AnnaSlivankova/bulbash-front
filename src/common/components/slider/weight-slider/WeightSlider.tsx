import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '../../../hooks'
import { SliderField } from '../SliderField'

export const WeightSlider: React.FC<PropsType> = ({ minWeightState, maxWeightState }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [values, setValues] = useState<number[]>([
		Number(searchParams.get('weight_min')) || minWeightState,
		Number(searchParams.get('weight_max')) || maxWeightState
	])
	const [isDebounced, setIsDebounced] = useState(true)
	const debouncedValues = useDebounce<number[]>(values)

	const changeSliderValuesHandler = (event: Event, value: number[] | number) => {
		setValues(value as number[])
		setIsDebounced(false)
	}

	const onChangeCommittedHandle = useCallback(() => {
		const params: { weight_min?: string; weight_max?: string } = {}

		if (values[0] !== minWeightState) params.weight_min = values[0].toString()
		else searchParams.delete('weight_min')

		if (values[1] !== maxWeightState) params.weight_max = values[1].toString()
		else searchParams.delete('weight_max')

		setSearchParams({
			...Object.fromEntries(searchParams),
			...params
		})
	}, [minWeightState, maxWeightState, searchParams, setSearchParams, values])

	useEffect(() => {
		if (isDebounced) {
			const params: { weight_min?: string; weight_max?: string } = {}

			if (debouncedValues[0] !== minWeightState) {
				params.weight_min = debouncedValues[0].toString()
			} else searchParams.delete('weight_min')

			if (debouncedValues[1] !== maxWeightState) {
				params.weight_max = debouncedValues[1].toString()
			} else searchParams.delete('weight_max')

			setSearchParams({
				...Object.fromEntries(searchParams),
				...params
			})
		}
	}, [debouncedValues, searchParams, setSearchParams])

	useEffect(() => {
		setValues([
			Number(searchParams.get('weight_min')) || minWeightState,
			Number(searchParams.get('weight_max')) || maxWeightState
		])
	}, [minWeightState, maxWeightState, searchParams])
	return (
		<SliderField
			values={values}
			setValues={setValues}
			minPriceState={minWeightState}
			maxPriceState={maxWeightState}
			setIsDebounced={setIsDebounced}
			onChangeCommittedHandle={onChangeCommittedHandle}
			changeSliderValuesHandler={changeSliderValuesHandler}
			title={'Сортировать по весу (гр.)'}
		/>
	)
}

type PropsType = {
	minWeightState: number
	maxWeightState: number
}
