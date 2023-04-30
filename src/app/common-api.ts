import axios from 'axios'

export const instance = axios.create({
	baseURL: process.env.NODE_ENV === 'development' ? 'http://0.0.0.0:8000' : 'http://0.0.0.0:8000'
})
