import { useEffect, useState } from 'react'

/**
 * A hook that returns a debounced value of the input.
 * @template V - The type of the input value.
 * @param {V} value - The input value to be debounced.
 * @param {number} timeout - The time to wait before returning the debounced value, in milliseconds. Default is 1000ms.
 * @returns {V} - The debounced value of the input.
 */

export const useDebounce = <V>(value: V, timeout = 500) => {
	const [debouncedValue, setDebouncedValue] = useState<V>(value)

	useEffect(() => {
		let timerId = setTimeout(() => {
			setDebouncedValue(value)
		}, timeout)

		return () => {
			clearTimeout(timerId)
		}
	}, [value])

	return debouncedValue
}
