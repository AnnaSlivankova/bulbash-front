import axios from 'axios'

export const instance = axios.create({
	baseURL: process.env.NODE_ENV !== 'development' ? 'https://bulbashfood.ru/' : 'https://bulbashfood.ru/'
})

const token = localStorage.getItem('token')
export const instanceUser = axios.create({
	baseURL: process.env.NODE_ENV !== 'development' ? 'https://bulbashfood.ru/' : 'https://bulbashfood.ru/',
	headers: {
		Authorization: `Bearer ${token}`
	}
})
