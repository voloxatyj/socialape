const isEmpty = string => string.trim() === '' ? true : false

const isEmail = email => {
	const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(regExp)) return true
	else return false
};

exports.validateSignUpData = data => {
	// Object of all errors
	let errors = {}

	// validate @email
	if (isEmpty(data.email)) {
		errors.email = 'Email must not be empty'
	} else if (!isEmail(data.email)) {
		errors.email = 'Email must be validate'
	}

	//validate *password*
	if (isEmpty(data.password)) errors.password = 'Must not be empty'
	if (data.password !== data.confirmPassword) errors.password = 'Passwords must be match'

	//validate handle
	if (isEmpty(data.handle)) errors.handle = 'Must not be empty'

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	}
}

exports.validateLogInData = data => {
	// Object of all errors
	let errors = {}

	// validate @email
	if (isEmpty(data.email)) {
		errors.email = 'Email must not be empty'
	} else if (!isEmail(data.email)) {
		errors.email = 'Email must be validate'
	}

	//validate *password*
	if (isEmpty(data.password)) errors.password = 'Must not be empty'
	
	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false
	}
}

exports.reduceUserInfo = data => {
	let userDetails = {}
	if(!isEmpty(data.bio.trim())) userDetails.bio = data.bio
	if(!isEmpty(data.website.trim())) {
		if(data.website.trim().substring(0,4) !== 'http') {
			userDetails.website = `http://${data.website.trim()}`
		} else userDetails.website = data.website
	}
	if (!isEmpty(data.location.trim())) userDetails.location = data.location;

	return userDetails
}