export type FetchCategoryResponseType = {
	id: number
	name: string
	description: string
	image_path: string
	status_enabled: boolean
	position: number
	date_created: string
	date_updated: string
}

export type AddNewCategoryResponseType = Omit<FetchCategoryResponseType, 'date_created' | 'date_updated'>

export type ChangeCategoryResponseType = {
	detail: string
}

export type CategoryDataType = {
	name: string
	description: string
	status_enabled: boolean
	position: number
	img_file: string
}
