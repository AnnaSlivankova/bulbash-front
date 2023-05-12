export const categoriesData = [
	{ id: 'id', label: 'id', isSortable: true, size: '5%' },
	{ id: 'image_path', label: 'Cover', isSortable: false, size: '10%' },
	{ id: 'name', label: 'Name', isSortable: true, size: '15%' },
	{ id: 'description', label: 'Description', isSortable: true, size: '30%' },
	{ id: 'status_enabled', label: 'Status', isSortable: true, size: '5%' },
	{ id: 'position', label: 'Position', isSortable: true, size: '5%' },
	{ id: 'date_created', label: 'Date created', isSortable: true, size: '10%' },
	{ id: 'date_updated', label: 'Date updated', isSortable: true, size: '10%' },
	{ id: 'actions', label: 'Actions', isSortable: false, size: '10%' }
]

export const subcategoriesData = [
	{ id: 'category_id', label: 'Category id', isSortable: true, size: '10%' },
	{ id: 'id', label: 'id', isSortable: true, size: '10%' },
	{ id: 'name', label: 'Name', isSortable: true, size: '40%' },
	{ id: 'status_enabled', label: 'Status', isSortable: true, size: '10%' },
	{ id: 'date_created', label: 'Date created', isSortable: true, size: '10%' },
	{ id: 'date_updated', label: 'Date updated', isSortable: true, size: '10%' },
	{ id: 'actions', label: 'Actions', isSortable: false, size: '10%' }
]

export const productsData = [
	{ id: 'category_id', label: 'Category id', isSortable: true, size: '5%' },
	{ id: 'subcategory_id', label: 'Subcategory id', isSortable: true, size: '5%' },
	{ id: 'id', label: 'id', isSortable: true, size: '5%' },
	{ id: 'image_path', label: 'Cover', isSortable: false, size: '10%' },
	{ id: 'name', label: 'Name', isSortable: true, size: '5%' },
	{ id: 'description', label: 'Description', isSortable: true, size: '25%' },
	{ id: 'ingredients', label: 'Ingredients', isSortable: true, size: '10%' },
	{ id: 'people_numbers', label: 'People numbers', isSortable: true, size: '5%' },
	{ id: 'price', label: 'Price', isSortable: true, size: '5%' },
	{ id: 'weight', label: 'Weight', isSortable: true, size: '5%' },
	{ id: 'status_enabled', label: 'Status', isSortable: true, size: '5%' },
	{ id: 'date_created', label: 'Date created', isSortable: true, size: '5%' },
	{ id: 'date_updated', label: 'Date updated', isSortable: true, size: '5%' },
	{ id: 'actions', label: 'Actions', isSortable: false, size: '5%' }
]

export type categoriesDataType = {
	id: string
	label: string
	isSortable: boolean
	size: string
}
