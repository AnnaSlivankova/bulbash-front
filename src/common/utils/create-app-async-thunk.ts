import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'app/store'

/**
 * Wrapper around `createAsyncThunk` that creates an async action creator.
 * Allows configuring types for `state`, `dispatch`, and `rejectValue` from the root Redux store state.
 * @function
 * @template Payload, ThunkArg, ThunkApiConfig
 * @param {object} options - Object with options for `createAsyncThunk`.
 * @returns {AsyncThunk<Payload, ThunkArg, ThunkApiConfig>} - Async action creator.
 * @typedef {object} RootState - Type of the root Redux store state.
 * @typedef {(action: Action<any>) => any} AppDispatch - Type of the Redux store dispatcher.
 * @typedef {null} rejectValue - Type of the value that can be returned when a rejection occurs.
 */

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: RootState
	dispatch: AppDispatch
	rejectValue: null
}>()
