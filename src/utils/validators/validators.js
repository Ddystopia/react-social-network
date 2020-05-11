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
	return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'(\\)*+,;=.]+$/gm.test(value) ? undefined : "Invalid URL"
}

const emailValidation = (value) => {
	return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? undefined : "Invalid Email"
}

export { required, maxLengthCreator, minLengthCreator, urlValidator, emailValidation }