import { instance } from '../../../app'

export const subcategoriesAdminAPI = {
	fetchSubcategories(params: RequestFetchSubCategoriesParamsType) {
		return instance
			.get<ResponseFetchSubcategoryType[]>('/api/v1/bulbash_admin/get_list_subcategories', { params })
			.then(res => res.data)
	},
	addNewSubcategory(data: RequestPostSubCategoryDataType) {
		return instance
			.post<ResponsePostSubcategoryType>('/api/v1/bulbash_admin/create_subcategory', data)
			.then(res => res.data)
	},
	updateSubcategory(subcategory_id: number, data: RequestPatchSubCategoryDataType) {
		return instance
			.patch<ResponseChangeSubcategoryType>(`/api/v1/bulbash_admin/update_subcategory_${subcategory_id}`, data)
			.then(res => res.data)
	},
	deleteSubcategory(subcategory_id: number) {
		return instance
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
}

export type RequestPostSubCategoryDataType = {
	name: string
	status_enabled: boolean
	category_id: number
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
