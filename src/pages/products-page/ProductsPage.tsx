import React, { useEffect, useState } from 'react'
import s from './ProductsPage.module.css'
import { Products } from '../../features/client/products/Products'
import { useActions } from '../../common/hooks'
import { productsThunks } from '../../features/client/products/products-slice'
import { useSelector } from 'react-redux'
import { selectCategory, selectProducts, selectSubcategories } from '../../features/client/products/products-selectors'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { SubcategoryButton } from '../../common/components/subcategory-button/subcategoryButton'
import { InfoBlock } from '../../common/components/info-block/InfoBlock'
import { RootState } from '../../app/store'
import { PaginationComponent } from '../../common/components/pagination/Pagination'
import { ProductsListParamsType } from '../../features/client/products/products-types'
import { productsParamsActions } from '../../features/client/products/products-params-slice'
import { PriceSlider } from '../../common/components/slider/price-slider/PriceSlider'
import { WeightSlider } from '../../common/components/slider/weight-slider/WeightSlider'
import Button from '@mui/material/Button'
import { changeImgPath } from '../../common/utils/changeImgPath'
import { CartCounter } from '../../common/components/counter/cart-counter/CartCounter'
import { SearchByPeople } from '../../common/components/search-by-people/SearchByPeople'
import { _InfoBlock } from '../../common/components/info-block/test/_InfoBlock'
import { makeStyles, useMediaQuery, useTheme } from '@mui/material'
import { ButtonBack } from '../../common/components/button-back/ButtonBack'

export const ProductsPage = () => {
	console.log('ProductsPage rendering')

	const { fetchProductsList, fetchSubCategories } = useActions(productsThunks)
	const {
		page,
		total_products,
		total_pages,
		page_count,
		maxPriceState,
		minPriceState,
		minWeightState,
		maxWeightState,
		minPeopleState,
		maxPeopleState
	} = useSelector<RootState, any>(state => state.products)
	const products = useSelector(selectProducts)
	const subcategories = useSelector(selectSubcategories)
	const { category_name, category_description } = useSelector(selectCategory)

	const [searchParams, setSearchParams] = useSearchParams()
	const { setProductsSearchParams } = useActions(productsParamsActions)
	const stateParams = useSelector<RootState, Partial<ProductsListParamsType>>(state => state.productsSearchParams)
	const navigate = useNavigate()
	const params = Object.fromEntries(searchParams)
	// const category_id = searchParams.get('category_id')

	const searchBySubcategory = (subcategory_id: number) => {
		setSearchParams({ ...Object.fromEntries(searchParams), subcategory_id: subcategory_id.toString() })
	}

	const searchByPeople = (people_of_numbers: number) => {
		setSearchParams({ ...Object.fromEntries(searchParams), people_of_numbers: people_of_numbers.toString() })
	}
	const searchByMinPrice = (people_of_numbers: number) => {
		setSearchParams({ ...Object.fromEntries(searchParams), price_min: people_of_numbers.toString() })
	}
	const searchByMaxPrice = (people_of_numbers: number) => {
		setSearchParams({ ...Object.fromEntries(searchParams), price_max: people_of_numbers.toString() })
	}
	const searchByMinWeight = (people_of_numbers: number) => {
		setSearchParams({ ...Object.fromEntries(searchParams), weight_min: people_of_numbers.toString() })
	}
	const searchByMaxWeight = (people_of_numbers: number) => {
		setSearchParams({ ...Object.fromEntries(searchParams), weight_max: people_of_numbers.toString() })
	}

	const [searchValue, setSearchValue] = useState('')

	const resetFilterHandler = () => {
		setSearchValue('')
		;['page', 'people_of_numbers', 'price_min', 'price_max', 'weight_min', 'weight_max', 'subcategory_id'].forEach(el =>
			searchParams.delete(el)
		)
		setSearchParams({
			...Object.fromEntries(searchParams)
		})
	}
	const redirectToHome = () => {
		navigate('/')
	}

	useEffect(() => {
		fetchSubCategories({ ...Object.fromEntries(searchParams) })
		fetchProductsList({ ...Object.fromEntries(searchParams) })
	}, [searchParams])

	return (
		<div className={s.container}>
			<_InfoBlock title={category_name} description={category_description} type={''}>
				{/*<InfoBlock title={category_name} description={category_description}>*/}
				{<ButtonBack callback={redirectToHome} />}
				{/*</InfoBlock>*/}
			</_InfoBlock>
			<div className={s.wrp}>
				<div className={s.leftBlock}>
					<div className={s.leftContainer}>
						<Button variant='contained' onClick={resetFilterHandler} style={{ margin: '8px' }}>
							Сбросить фильтр
						</Button>
						<div className={s.peopleWrapper}>
							<div className={s.peopleTitle}>Сортировать по цене</div>
							<div className={s.peopleSubText}>{`от ${minPriceState ?? 0} руб. - до ${maxPriceState ?? 0} руб.`}</div>
							<div className={s.searchMultiple}>
								от
								<SearchByPeople callback={searchByMinPrice} searchValue={searchValue} />
								до
								<SearchByPeople callback={searchByMaxPrice} searchValue={searchValue} />
							</div>
						</div>
						<div className={s.peopleWrapper}>
							<div className={s.peopleTitle}>Сортировать по весу</div>
							<div className={s.peopleSubText}>{`от ${minWeightState ?? 0} гр. - до ${maxWeightState ?? 0} гр.`}</div>
							<div className={s.searchMultiple}>
								от
								<SearchByPeople callback={searchByMinWeight} searchValue={searchValue} />
								до
								<SearchByPeople callback={searchByMaxWeight} searchValue={searchValue} />
							</div>
						</div>
						{/*<PriceSlider minPriceState={minPriceState} maxPriceState={maxPriceState} />*/}
						{/*<WeightSlider minWeightState={minWeightState} maxWeightState={maxWeightState} />*/}
						<div className={s.peopleWrapper}>
							<div className={s.peopleTitle}>Сортировать по количеству человек</div>
							<div className={s.peopleSubText}>{`от ${minPeopleState ?? 0} чел. - до ${maxPeopleState ?? 0} чел.`}</div>
							<SearchByPeople callback={searchByPeople} searchValue={searchValue} />
						</div>
					</div>
				</div>

				<div className={s.rightBlock}>
					<div className={s.rightContainer}>
						<div className={s.subcategories}>
							{subcategories.map(el => {
								return <SubcategoryButton key={el.id} name={el.name} callback={() => searchBySubcategory(el.id)} />
							})}
						</div>
						{/*<div>Sort by price/by popularity/</div>*/}
						<div className={s.products}>
							{!products.length ? (
								<h2>по Вашему запросу ничего не найдено</h2>
							) : (
								products.map(el => {
									const imgPath = changeImgPath(el.image_path)

									return (
										<Products
											key={el.id}
											zoom={true}
											id={el.id}
											// imgPath={imgPath}
											//for prod img_path bellow
											imgPath={el.image_path}
											name={el.name}
											description={el.description}
											price={el.price}
											peopleNumber={el.people_numbers}
											weight={el.weight}
										/>
									)
								})
							)}
						</div>
					</div>
				</div>
			</div>
			<div className={s.pagination}>
				<PaginationComponent
					page={page}
					pageCount={page_count}
					productsTotalCount={total_products}
					total_pages={total_pages}
				/>
			</div>
		</div>
	)
}
