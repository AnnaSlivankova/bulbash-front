import { instance } from 'app'
import { CategoryItemType } from 'features/categories/categories-types'

export const categoriesAPI = {
	fetchCategories() {
		return instance.get<CategoryItemType[]>('/api/v1/category/list').then(res => res.data)
	}
}
