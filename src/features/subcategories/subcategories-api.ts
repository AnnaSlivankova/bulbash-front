import { instance } from 'app'
import { ProductsListParamsType, ProductsListResponseType } from 'features/subcategories/subcategories-types'

export const subcategoriesApi = {
	fetchProductsList(params: Partial<ProductsListParamsType>) {
		return instance
			.get<ProductsListResponseType>('/api/v1/product/products_list', { params: params })
			.then(res => res.data)
	}
}
