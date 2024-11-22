import { RootState } from '../../app/store'

export const selectAboutUs = (state: RootState) => state.commonInfo.aboutUs
