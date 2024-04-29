import { instance } from '../app'

export const infoApi = {
	getShortInfo() {
		return instance.get<ResponseInfo<ShortContacts>>('/api/v1/conctacts/get-short-contacts', {}).then(res => res.data)
	},
	getInfo() {
		return instance.get<ResponseInfo>('/api/v1/conctacts/get-contacts', {}).then(res => res.data)
	}
}

export type ResponseInfo<T = Contacts> = {
	contacts: T
}
export type ShortContacts = {
	id: number
	name_organization: string
	phone_number_1: string
	email: string
	telegram_link: string
	instagram_link: string
	app_link: string
	pan: string
	certificate_number: string
	commercial_register: string
	issued_by: string
	organization_address: string
	bank_current_account: string
	bank_identification_code: string
	bank_address: string
}

export type Contacts = {
	// id: number
	// name_organization: string
	// phone_number_1: string
	phone_number_2?: any
	// email: string
	// telegram_link: string
	// instagram_link: string
	// app_link: string
	// pan: string
	// certificate_number: string
	// commercial_register: string
	// issued_by: string
	// organization_address: string
	physical_address: string
	photo_certificate: string
	// bank_current_account: string
	// bank_identification_code: string
	// bank_address: string
	about_me: string
	date_created: string
	date_updated: string
} & ShortContacts
