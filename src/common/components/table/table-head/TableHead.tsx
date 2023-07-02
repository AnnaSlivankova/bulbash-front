import React from 'react'

import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { SortArrow } from '../../sort/SortArrow'

import { categoriesDataType } from '../../../data/table-head-data'
import { useMediaQuery, useTheme } from '@mui/material'

const style = {
	wrapper: {
		background: '#EFEFEF'
	}
}

export const TableHeadComponent: React.FC<Type> = ({ sort, headData }) => {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

	return (
		<TableHead sx={style.wrapper}>
			<TableRow>
				{headData.map(el => {
					return (
						<TableCell
							key={el.id}
							align='left'
							sx={{
								fontSize: isSmallScreen ? 8 : 14,
								padding: isSmallScreen ? 0.5 : 2
							}}
							// width={el.size}
						>
							{el.isSortable ? <SortArrow title={el.label} value={el.id} sort={sort} /> : <span>{el.label}</span>}
						</TableCell>
					)
				})}
			</TableRow>
		</TableHead>
	)
}

type Type = { sort: string | undefined; headData: categoriesDataType[] }
