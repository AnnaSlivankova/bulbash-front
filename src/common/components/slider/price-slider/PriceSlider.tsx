import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '../../../hooks'
import { SliderField } from '../SliderField'

export const PriceSlider: React.FC<PropsType> = ({ minPriceState, maxPriceState }) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [values, setValues] = useState<number[]>([
		Number(searchParams.get('price_min')) || minPriceState,
		Number(searchParams.get('price_max')) || maxPriceState
	])
	const [isDebounced, setIsDebounced] = useState(true)
	const debouncedValues = useDebounce<number[]>(values)

	const changeSliderValuesHandler = (event: Event, value: number[] | number) => {
		setValues(value as number[])
		setIsDebounced(false)
	}

	const onChangeCommittedHandle = useCallback(() => {
		const params: { price_min?: string; price_max?: string } = {}

		if (values[0] !== minPriceState) params.price_min = values[0].toString()
		else searchParams.delete('price_min')

		if (values[1] !== maxPriceState) params.price_max = values[1].toString()
		else searchParams.delete('price_max')

		setSearchParams({
			...Object.fromEntries(searchParams),
			...params
		})
	}, [minPriceState, maxPriceState, searchParams, setSearchParams, values])

	useEffect(() => {
		if (isDebounced) {
			const params: { price_min?: string; price_max?: string } = {}

			if (debouncedValues[0] !== minPriceState) {
				params.price_min = debouncedValues[0].toString()
			} else searchParams.delete('price_min')

			if (debouncedValues[1] !== maxPriceState) {
				params.price_max = debouncedValues[1].toString()
			} else searchParams.delete('price_max')

			setSearchParams({
				...Object.fromEntries(searchParams),
				...params
			})
		}
	}, [debouncedValues, searchParams, setSearchParams])

	useEffect(() => {
		setValues([
			Number(searchParams.get('price_min')) || minPriceState,
			Number(searchParams.get('price_max')) || maxPriceState
		])
	}, [minPriceState, maxPriceState, searchParams])

	return (
		<SliderField
			values={values}
			setValues={setValues}
			minPriceState={minPriceState}
			maxPriceState={maxPriceState}
			setIsDebounced={setIsDebounced}
			onChangeCommittedHandle={onChangeCommittedHandle}
			changeSliderValuesHandler={changeSliderValuesHandler}
			title={'Сортировать по цене (руб.)'}
		/>
	)
}

type PropsType = {
	minPriceState: number
	maxPriceState: number
}
