export type ProductsListResponseType = {
	products: ProductType[]
	total_products: number
	page: number
	total_pages: number
	price_min: number
	price_max: number
	weight_min: number
	weight_max: number
	people_numbers_min: number
	people_numbers_max: number
}
export type ProductType = {
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
export type ProductsListParamsType = {
	page: number
	people_of_numbers: number
	price_min: number
	price_max: number
	category_id: number
	subcategory_id: number
	weight_min: number
	weight_max: number
}
export type SubcategoriesType = {
	id: number
	name: string
	status_enabled: boolean
	category_id: number
	date_created: string
	date_updated: string
}
