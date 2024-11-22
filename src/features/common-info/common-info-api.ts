import { instance } from '../../app'
import { AboutUsType } from './common-info-types'
import { endpoints } from '../../common/constants/api-constants'

export const commonInfoApi = {
	fetchAboutUsInfo() {
		return instance.get<AboutUsType>(endpoints.aboutUs).then(res => res.data)
	}
}
