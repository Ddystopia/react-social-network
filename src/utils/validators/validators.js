const required = value => {
	return value ? undefined : 'Field is required'
}

const maxLengthCreator = maxLength => value => {
	return value && value.length > maxLength ? `Max length is ${maxLength}` : undefined;
}

const minLengthCreator = minLength => value => {
	return value && value.length < minLength ? `Min length is ${minLength}` : undefined;
}

const urlValidator = (value) => {
	
	return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'(\\)*+,;=.]+$/gm.test(value) ? undefined : "Invalid Email"
}

export { required, maxLengthCreator, minLengthCreator, urlValidator }