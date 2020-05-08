const required = value => {
	return value ? undefined : 'Field is required'
}

const maxLengthCreator = maxLength => value => {
	return value.length > maxLength ? `Max length is ${maxLength}` : undefined;
}

const minLengthCreator = minLength => value => {
	return value.length < minLength ? `Min length is ${minLength}` : undefined;
}

export { required, maxLengthCreator, minLengthCreator }