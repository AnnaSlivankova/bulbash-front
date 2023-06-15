import React from 'react'
import { Carusel } from 'pages/home-page/carusel/Carusel'
import { Categories } from 'features/client/categories/Categories'
import { InfoBlock } from '../../common/components/info-block/InfoBlock'

export const HomePage = () => {
	return (
		<>
			{/*<info-delete />*/}
			<InfoBlock title={'bulbash food'} description={'catering'} type={'HomePage'} />
			<Carusel />
			<Categories />
		</>
	)
}
