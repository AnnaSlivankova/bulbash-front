import React, { useEffect } from 'react'
import s from './AboutUsPage.module.css'
import { InfoBlock } from '../../common/components/info-block/InfoBlock'
import { useActions } from '../../common/hooks'
import { commonInfoThunks } from '../../features/common-info/common-info-slice'
import { useSelector } from 'react-redux'
import { selectAboutUs } from '../../features/common-info/common-info-selectors'
import DOMPurify from 'dompurify'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

export const AboutUsPage = () => {
	const { fetchAboutUsInfo } = useActions(commonInfoThunks)
	const aboutUsInfo = useSelector(selectAboutUs)

	useEffect(() => {
		fetchAboutUsInfo({})
	}, [])

	return (
		<div className={s.wrapper}>
			<InfoBlock title={'bulbash food'} description={'catering'} type={'HomePage'} />
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Typography variant='h5' sx={{ textAlign: 'center', mt: '20px' }}>
					О НАС
				</Typography>
			</Box>
			{aboutUsInfo && (
				<div className={s.text} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aboutUsInfo.text) }} />
			)}
		</div>
	)
}
