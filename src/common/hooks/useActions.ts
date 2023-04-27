import { useMemo } from 'react'
import { ActionCreatorsMapObject, bindActionCreators } from 'redux'
import { useAppDispatch } from './useAppDispatch'

/**
 * A custom hook that binds Redux action creators to the dispatch function and memoizes the result.
 * @template T - The type of the action creators.
 * @param {T} actions - The action creators to bind to the dispatch function.
 * @returns {RemapActionCreators<T>} - An object containing the bound action creators.
 */

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
	const dispatch = useAppDispatch()

	return useMemo(() => bindActionCreators<T, RemapActionCreators<T>>(actions, dispatch), [actions, dispatch])
}

// Types
type IsValidArg<T> = T extends object ? (keyof T extends never ? false : true) : true
type ActionCreatorResponse<T extends (...args: any[]) => any> = ReturnType<ReturnType<T>>
type ReplaceReturnType<T, TNewReturn> = T extends (a: infer A) => infer R
	? IsValidArg<A> extends true
		? (a: A) => TNewReturn
		: () => TNewReturn
	: never
type RemapActionCreators<T extends ActionCreatorsMapObject> = {
	[K in keyof T]: ReplaceReturnType<T[K], ActionCreatorResponse<T[K]>>
}
