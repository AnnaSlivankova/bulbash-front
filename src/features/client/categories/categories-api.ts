import { instance } from 'app'
import { CategoryItemType } from 'features/client/categories/categories-types'

export const categoriesAPI = {
	fetchCategories() {
		return instance.get<CategoryItemType[]>('/api/v1/category/list').then(res => res.data)
	}
}
