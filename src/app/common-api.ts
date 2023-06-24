import axios from 'axios'

export const instance = axios.create({
	baseURL: process.env.NODE_ENV === 'development' ? 'http://0.0.0.0:8000' : 'http://0.0.0.0:8000'
})

const token = localStorage.getItem('token')
export const instanceUser = axios.create({
	baseURL: process.env.NODE_ENV === 'development' ? 'http://0.0.0.0:8000' : 'http://0.0.0.0:8000',
	// withCredentials: true,
	headers: {
		Authorization: `Bearer ${token}`
	}
})
