import React, { ChangeEvent, useEffect, useState } from 'react'
import { SelectChangeEvent } from '@mui/material'
import Pagination from '@mui/material/Pagination/Pagination'
import { useAppDispatch } from 'common/hooks'

export const PaginationComponent: React.FC<PaginationPropsType> = ({
	appStatus,
	page,
	pageCount,
	productsTotalCount,
	total_pages
}) => {
	const dispatch = useAppDispatch()
	const lastPage = Math.ceil(productsTotalCount / pageCount)

	const [pageCountValue, setPageCountValue] = useState<number>(pageCount)
	const [pageValue, setPageValue] = useState<number>(page)

	const onChangePagination = (event: ChangeEvent<unknown>, page: number) => {
		setPageValue(page)
	}
	const onChangePageValue = (event: SelectChangeEvent<number>) => {
		setPageCountValue(+event.target.value)
	}

	useEffect(() => {
		// dispatch(packsActions.setPage({ page: pageValue }))
		// dispatch(packsActions.setPageCount({ pageCount: pageCountValue }))
	}, [pageValue, pageCountValue])

	return (
		<div>
			{/*<Pagination shape='rounded' page={pageValue} count={lastPage} onChange={onChangePagination} />*/}
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
}
