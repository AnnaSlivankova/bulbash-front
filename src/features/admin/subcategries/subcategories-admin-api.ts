import { instance } from '../../../app'
import { instanceUser } from '../../../app/common-api'

export const subcategoriesAdminAPI = {
	fetchSubcategories(params: RequestFetchSubCategoriesParamsType) {
		return instanceUser
			.get<ResponseFetchSubcategoryType[]>('/api/v1/bulbash_admin/get_list_subcategories', { params })
			.then(res => res.data)
	},
	fetchShortSubcategories() {
		return instanceUser
			.get<ResponseFetchShortSubcategoryType[]>('/api/v1/bulbash_admin/get-list-short-subcategories')
			.then(res => res.data)
	},
	addNewSubcategory(data: RequestPostSubCategoryDataType) {
		return instanceUser
			.post<ResponsePostSubcategoryType>('/api/v1/bulbash_admin/create_subcategory', data)
			.then(res => res.data)
	},
	updateSubcategory(subcategory_id: number, data: RequestPatchSubCategoryDataType) {
		return instanceUser
			.patch<ResponseChangeSubcategoryType>(`/api/v1/bulbash_admin/update_subcategory_${subcategory_id}`, data)
			.then(res => res.data)
	},
	deleteSubcategory(subcategory_id: number) {
		return instanceUser
			.delete<ResponseChangeSubcategoryType>(`/api/v1/bulbash_admin/delete_subcategory_${subcategory_id}`)
			.then(res => res.data)
	}
}

export type RequestFetchSubCategoriesParamsType = {
	status_enabled?: boolean
	category_id?: number
	name?: string
}

export type ResponseFetchSubcategoryType = {
	id: number
	name: string
	status_enabled: boolean
	category_id: number
	date_created: string
	date_updated: string

	category_name: string
}

export type RequestPostSubCategoryDataType = {
	name: string
	status_enabled: boolean
	category_id: number
}

export type ResponseFetchShortSubcategoryType = {
	id: number
	name: string
}

export type ResponsePostSubcategoryType = {
	name: string
	status_enabled: boolean
	category_id: number
	id: number
}
export type RequestPatchSubCategoryDataType = {
	name: string
	status_enabled: boolean
	category_id: number
}
export type ResponseChangeSubcategoryType = {
	detail: string
}
