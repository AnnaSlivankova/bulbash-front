import axios from 'axios'

export const instance = axios.create({
	baseURL: process.env.NODE_ENV !== 'development' ? 'https://bulbash-food.by/' : 'https://bulbash-food.by/'
})

const token = localStorage.getItem('token')
export const instanceUser = axios.create({
	baseURL: process.env.NODE_ENV !== 'development' ? 'https://bulbash-food.by/' : 'https://bulbash-food.by/',
	headers: {
		Authorization: `Bearer ${token}`
	}
})
