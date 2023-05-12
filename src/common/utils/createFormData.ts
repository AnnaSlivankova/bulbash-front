export const createFormData = (file: File, fieldName = 'image', additionalData: { [key: string]: any } = {}) => {
	const formData = new FormData()
	formData.append(fieldName, file)

	Object.keys(additionalData).forEach(key => {
		formData.append(key, additionalData[key])
	})

	return formData
}
