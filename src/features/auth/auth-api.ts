import { instance } from '../../app'
import { instanceUser } from '../../app/common-api'

export const authAPI = {
	me() {
		return instanceUser.get<ResponseMeType>('api/v1/users/me').then(res => res.data)
	},
	login(data: RequestLoginType) {
		return (
			instance
				.post<ResponseLoginType>('api/v1/users/login', data, {
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				})
				// .post<string>('api/v1/users/login', data, { headers: { Authorization: `Bearer ${token}` } })
				.then(res => res.data)
		)
	},
	signup(data: RequestSignupType) {
		return instance.post<{ message: string }>('api/v1/users/register', data).then(res => res.data)
	},
	logout() {
		return instanceUser.post<CommonResponseType>('api/v1/users/logout').then(res => res.data)
	},
	restorePassword(data: string) {
		return instance.post<any>('api/v1/users/forgot-your-password', data).then(res => res.data)
	},
	setNewPassword(data: RequestNewPasswordType) {
		return instance.post<ResponseSetNewPassword>('api/v1/users/restore-new-password', data).then(res => res.data)
	},
	verifyEmail(token: string) {
		return instance
			.get<ResponseVerifyToken>('/api/v1/users/verify-email', {
				params: { token }
			})
			.then(res => res.data)
	}
}
export type ResponseSetNewPassword = {
	access_token: string
	message: string
	refresh_token: string
	token_type: string
}
export type CommonResponseType = {
	message: string
}
export type ResponseVerifyToken = {
	access_token: string
	refresh_token: string
	token_type: string
}

export type RequestNewPasswordType = {
	token: string
	password: string
	confirm_password: string
}

export type ResponseMeType = {
	name: string
	surname: string
	email: string
	is_active: boolean
}
export type RequestLoginType = {
	grant_type?: string
	username: string
	password: string
	scope?: string
	client_id?: string
	client_secret?: string
}
export type ResponseLoginType = {
	access_token: string
	refresh_token: string
	token_type: string
}
export type RequestSignupType = {
	name: string
	surname: string
	email: string
	password: string
	confirm_password: string
}
