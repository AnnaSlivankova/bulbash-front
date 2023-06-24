export const categoriesData = [
	{ id: 'id', label: 'id', isSortable: true, size: '5%' },
	{ id: 'image_path', label: 'Картинка', isSortable: false, size: '10%' },
	{ id: 'name', label: 'Название', isSortable: true, size: '15%' },
	{ id: 'description', label: 'Описание', isSortable: true, size: '30%' },
	{ id: 'status_enabled', label: 'Статус', isSortable: true, size: '5%' },
	{ id: 'position', label: 'Position', isSortable: true, size: '5%' },
	{ id: 'date_created', label: 'Дата добавления', isSortable: true, size: '10%' },
	{ id: 'date_updated', label: 'Дата обновления', isSortable: true, size: '10%' },
	{ id: 'actions', label: 'Действия', isSortable: false, size: '10%' }
]

export const subcategoriesData = [
	{ id: 'category_id', label: 'id категории', isSortable: true, size: '10%' },
	{ id: 'id', label: 'id', isSortable: true, size: '10%' },
	{ id: 'name', label: 'Название', isSortable: true, size: '40%' },
	{ id: 'status_enabled', label: 'Статус', isSortable: true, size: '10%' },
	{ id: 'date_created', label: 'Дата добавления', isSortable: true, size: '10%' },
	{ id: 'date_updated', label: 'Дата обновления', isSortable: true, size: '10%' },
	{ id: 'actions', label: 'Действия', isSortable: false, size: '10%' }
]

export const productsData = [
	{ id: 'category_id', label: 'id категории', isSortable: true, size: '5%' },
	{ id: 'subcategory_id', label: 'id подкатегории', isSortable: true, size: '5%' },
	{ id: 'id', label: 'id', isSortable: true, size: '5%' },
	{ id: 'image_path', label: 'Картинка', isSortable: false, size: '10%' },
	{ id: 'name', label: 'Название', isSortable: true, size: '5%' },
	{ id: 'description', label: 'Описание', isSortable: true, size: '25%' },
	{ id: 'ingredients', label: 'Ингридиенты', isSortable: true, size: '10%' },
	{ id: 'people_numbers', label: 'Кол-во людей', isSortable: true, size: '5%' },
	{ id: 'price', label: 'Цена', isSortable: true, size: '5%' },
	{ id: 'weight', label: 'Вес', isSortable: true, size: '5%' },
	{ id: 'status_enabled', label: 'Статус', isSortable: true, size: '5%' },
	{ id: 'date_created', label: 'Дата добавления', isSortable: true, size: '5%' },
	{ id: 'date_updated', label: 'Дата обновления', isSortable: true, size: '5%' },
	{ id: 'actions', label: 'Действия', isSortable: false, size: '5%' }
]

export const userOrdersData = [
	{ id: 'id', label: '№ заказа', isSortable: true, size: '10%' },
	{ id: 'payment_method', label: 'Способ оплаты', isSortable: true, size: '20%' },
	{ id: 'total_cost', label: 'Стоимость', isSortable: true, size: '20%' },
	{ id: 'status', label: 'Статус', isSortable: true, size: '20%' },
	{ id: 'date_created', label: 'Дата добавления', isSortable: true, size: '15%' },
	{ id: 'details', label: '', isSortable: false, size: '15%' }
]

export const adminOrdersData = [
	{ id: 'id', label: '№ заказа', isSortable: true, size: '10%' },
	{ id: 'user_uuid', label: 'User id', isSortable: true, size: '10%' },
	{ id: 'payment_method', label: 'Способ оплаты', isSortable: true, size: '10%' },
	{ id: 'total_cost', label: 'Стоимость', isSortable: true, size: '20%' },
	{ id: 'status', label: 'Статус', isSortable: true, size: '20%' },
	{ id: 'date_created', label: 'Дата добавления', isSortable: true, size: '15%' },
	{ id: 'details', label: '', isSortable: false, size: '15%' }
]

export type categoriesDataType = {
	id: string
	label: string
	isSortable: boolean
	size: string
}
