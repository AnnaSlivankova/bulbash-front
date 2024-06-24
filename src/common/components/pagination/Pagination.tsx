import React, { ChangeEvent } from 'react'
import Pagination from '@mui/material/Pagination/Pagination'

export const PaginationComponent: React.FC<PaginationPropsType> = ({
	appStatus,
	page,
	pageCount,
	productsTotalCount,
	total_pages,
	setPage
}) => {
	const onChangePagination = (event: ChangeEvent<unknown>, page: number) => {
		setPage(page)
	}

	return (
		<div>
			<Pagination shape='rounded' page={page} count={total_pages} onChange={onChangePagination} />
		</div>
	)
}

type PaginationPropsType = {
	appStatus?: boolean
	page: number //какая страница кликнута, номер страницы
	pageCount: number //сколько итемсов на странице будет 18
	productsTotalCount: number
	total_pages: number
	setPage: (page: number) => void
}
