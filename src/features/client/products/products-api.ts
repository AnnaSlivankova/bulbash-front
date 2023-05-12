import { instance } from 'app'
import {
	ProductsListParamsType,
	ProductsListResponseType,
	SubcategoriesType
} from 'features/client/products/products-types'

export const productsApi = {
	fetchProductsList(params: Partial<ProductsListParamsType>) {
		return instance
			.get<ProductsListResponseType>('/api/v1/product/products_list', { params: params })
			.then(res => res.data)
	},
	fetchSubCategories(params: { category_id?: number; name?: string }) {
		return instance
			.get<SubcategoriesType[]>('/api/v1/category/subcategory_list', { params: params })
			.then(res => res.data)
	},
	fetchProduct(product_id: number) {
		return instance.get<ResponseFetchProduct>(`/api/v1/product/product_${product_id}`).then(res => res.data)
	}
}

export type ResponseFetchProduct = {
	id: number
	name: string
	description: string
	ingredients: string
	people_numbers: number
	price: number
	weight: number
	category_id: number
	subcategory_id: number
	status_enabled: boolean
	image_path: string
	date_created: string
	date_updated: string
}
