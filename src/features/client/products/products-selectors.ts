import { RootState } from 'app/store'

export const selectProducts = (state: RootState) => state.products.products
export const selectSubcategories = (state: RootState) => state.products.subcategories
export const selectCategoryId = (state: RootState) => state.products.category_id
export const selectCategory = (state: RootState) => state.products
