import { instance } from '../../../app'
import { instanceUser } from '../../../app/common-api'

export const productsAdminAPI = {
	fetchProducts() {
		return instanceUser.get<ResponseFetchProducts[]>('/api/v1/bulbash_admin/get_list_products').then(res => res.data)
	},
	addNewProduct(params: RequestPostProduct, img_file: FormData) {
		return instanceUser
			.post<ResponsePostProduct>('/api/v1/bulbash_admin/create_product', img_file, {
				params,
				headers: {
					'Content-Type': 'multipart/form-data',
					Accept: 'application/json'
				}
			})
			.then(res => res.data)
	},
	updateProduct(product_id: number, params: Partial<RequestPostProduct>, img_file?: FormData) {
		return instanceUser
			.patch<ResponseChangeProduct>(`/api/v1/bulbash_admin/update_product_${product_id}`, img_file, {
				params,
				headers: { 'Content-Type': 'multipart/form-data', Accept: 'application/json' }
			})
			.then(res => res.data)
	},
	deleteProduct(product_id: number) {
		return instanceUser
			.delete<ResponseChangeProduct>(`/api/v1/bulbash_admin/delete_product_${product_id}`)
			.then(res => res.data)
	}
}

export type ResponseFetchProducts = {
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

export type RequestPostProduct = {
	name: string
	description: string
	ingredients: string
	people_numbers: number
	price: number
	weight: number
	category_id: number
	subcategory_id: number
	status_enabled: boolean
}

export type ResponsePostProduct = {
	name: string
	description: string
	ingredients: string
	people_numbers: number
	price: number
	weight: number
	category_id: number
	subcategory_id: number
	status_enabled: boolean
	id: number
}
export type ResponseChangeProduct = {
	detail: string
}
