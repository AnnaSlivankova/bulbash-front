import {
	AddNewCategoryResponseType,
	CategoryDataType,
	ChangeCategoryResponseType,
	FetchCategoryResponseType
} from '../admin-page-types'
import { instanceUser } from '../../../app/common-api'

export const categoriesAdminAPI = {
	fetchCategories() {
		return instanceUser
			.get<FetchCategoryResponseType[]>('/api/v1/bulbash_admin/get_list_categories', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			.then(res => res.data)
	},
	fetchShortCategories() {
		return instanceUser
			.get<ResponseFetchShortCategories[]>('/api/v1/bulbash_admin/get-list-short-categories', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			.then(res => res.data)
	},
	addNewCategory(args: { data: Omit<CategoryDataType, 'img_file'>; img_file: FormData }) {
		return instanceUser
			.post<AddNewCategoryResponseType>('/api/v1/bulbash_admin/create_category', args.img_file, {
				params: args.data,
				headers: {
					'Content-Type': 'multipart/form-data',
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			.then(res => res.data)
	},
	updateCategory(args: { data: Omit<Partial<CategoryDataType>, 'img_file'>; category_id: number; img_file: FormData }) {
		return instanceUser
			.patch<ChangeCategoryResponseType>(`/api/v1/bulbash_admin/update_category_${args.category_id}`, args.img_file, {
				params: args.data,
				headers: {
					'Content-Type': 'multipart/form-data',
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			.then(res => res.data)
	},
	deleteCategory(category_id: number) {
		return instanceUser
			.delete<ChangeCategoryResponseType>(`/api/v1/bulbash_admin/delete_category_${category_id}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})
			.then(res => res.data)
	}
}

export type ResponseFetchShortCategories = {
	id: number
	name: string
}
