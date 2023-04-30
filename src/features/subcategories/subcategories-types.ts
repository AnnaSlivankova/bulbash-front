export type ProductsListResponseType = {
	products: ProductType[]
	total_products: number
	page: number
	total_pages: number
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
