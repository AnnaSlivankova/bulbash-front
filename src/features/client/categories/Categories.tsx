import React, { useEffect, useState } from 'react'
import { useActions } from 'common/hooks'
import { categoriesThunks } from 'features/client/categories/categories-slice'
import { useSelector } from 'react-redux'
import { selectCategories } from 'features/client/categories/categories-selectors'
import s from './Categories.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { CategoryCard } from '../../../common/components/cards/admin-card/CategoryCard'
import { changeImgPath } from '../../../common/utils/changeImgPath'
import { productsActions } from '../products/products-slice'
import { productsParamsActions } from '../products/products-params-slice'

export const Categories = () => {
	const { fetchCategories } = useActions(categoriesThunks)
	const { setCategoryId, setCategoryName, setCategoryDescription } = useActions(productsActions)
	const { setProductsSearchParams } = useActions(productsParamsActions)
	const categories = useSelector(selectCategories)
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams()

	const [zoom, setZoom] = useState(false)

	useEffect(() => {
		fetchCategories({})
		setZoom(true)
	}, [])

	const redirectToSub = (category_id: number, category_name: string, category_description: string) => {
		setCategoryId({ category_id })
		setCategoryName({ category_name })
		setCategoryDescription({ category_description })
		// navigate('/products')
		navigate(`/products?category_id=${category_id}`)
	}

	return (
		<div className={s.wrapper}>
			<div className={s.container}>
				<div className={s.containerTwo}>
					{categories.map(el => {
						const imgPath = changeImgPath(el.image_path)

						return (
							<CategoryCard
								key={el.id}
								zoom={true}
								title={el.name}
								description={el.description}
								imgPath={imgPath}
								onClick={() => redirectToSub(el.id, el.name, el.description)}
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}
