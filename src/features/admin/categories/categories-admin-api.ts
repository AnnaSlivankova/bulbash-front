import { instance } from '../../../app'
import {
	AddNewCategoryResponseType,
	CategoryDataType,
	ChangeCategoryResponseType,
	FetchCategoryResponseType
} from '../admin-page-types'

export const categoriesAdminAPI = {
	fetchCategories() {
		return instance.get<FetchCategoryResponseType[]>('/api/v1/bulbash_admin/get_list_categories').then(res => res.data)
	},
	addNewCategory(args: { data: Omit<CategoryDataType, 'img_file'>; img_file: FormData }) {
		return instance
			.post<AddNewCategoryResponseType>('/api/v1/bulbash_admin/create_category', args.img_file, {
				params: args.data,
				headers: {
					'Content-Type': 'multipart/form-data',
					Accept: 'application/json'
				}
			})
			.then(res => res.data)
	},
	updateCategory(args: { data: Omit<Partial<CategoryDataType>, 'img_file'>; category_id: number; img_file: FormData }) {
		return instance
			.patch<ChangeCategoryResponseType>(`/api/v1/bulbash_admin/update_category_${args.category_id}`, args.img_file, {
				params: args.data,
				headers: {
					'Content-Type': 'multipart/form-data',
					Accept: 'application/json'
				}
			})
			.then(res => res.data)
	},
	deleteCategory(category_id: number) {
		return instance
			.delete<ChangeCategoryResponseType>(`/api/v1/bulbash_admin/delete_category_${category_id}`)
			.then(res => res.data)
	}
}
