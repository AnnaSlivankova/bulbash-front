import React, { useState } from 'react'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Button from '@mui/material/Button'

// import { useActions } from '../../../../common/utils/hooks/useActions'
// import { packsThunks } from '../../packs-slice'
import { BaseModal } from '../BaseModal'

import s from './DeleteModal.module.css'

export const DeleteModal: React.FC<DeleteType> = ({ id, prevName, callback, deleteTitle }) => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const deletePackHandler = () => {
		// deletePack(id)
		callback()
		handleClose()
	}

	return (
		<BaseModal
			open={open}
			handleOpen={handleOpen}
			handleClose={handleClose}
			title={deleteTitle}
			button={<DeleteOutlineIcon color='secondary' />}
		>
			<div>
				Вы уверены, что хотите удалить <span className={s.text}>{prevName}</span>? Вся информация об этой позиции будет
				удалена.
			</div>
			<div className={s.btnWrapper}>
				<Button onClick={deletePackHandler} variant='contained' color='error'>
					удалить
				</Button>
			</div>
		</BaseModal>
	)
}

type DeleteType = { id: any; prevName: string; callback: () => void; deleteTitle: string }
