exports.createPostValidator = (req, res, next) => {
	//title

req.check('title',"Write a title!").notEmpty();
req.check('title',"Title length unacceptable. Must be between 4 to 150 characters").isLength({
		min: 4,
		max: 150
	});

	//body
	req.check('body',"Write a body").notEmpty();
	req.check('body',"Body length unacceptable. Must be between 4 to 2000 characters").isLength({
		min: 4,
		max: 2000
	});

	//check for all other errors

	const errors=req.validationErrors()

	//if error shows the first one as they happen

	if(errors) {

		const firstError = errors.map((error) => error.msg)[0]
		return res.status(400).json({error: firstError})

	}
	// proceed to next middleware
	next();
};

exports.userSignupValidator = (req, res, next) => {
//NAME IS NOT NULL AND IS BETWEEN 4 TO 10 
req.check("name", "Name is required").notEmpty();

//email is not null and is valid and normalized

req.check("email","Email must be between 4 to 10 characters")
.matches(/.+\@.+\..+/)
.withMessages("Email must contain @")
.isLength({
min:4,
max:2000

})

//CHECK F(OR PASSWORD
req.check("password", "Password is required").notEmpty();
req.check('password')
.isLength({min: 6})
.withMessage("Password must contain atleast 6 characters")
.matches(/\d/)
.withMessage("Password must contain a number")

//CHECK FOR ERRORS

const errors=req.validationErrors()

	//if error shows the first one as they happen

	if(errors) {

		const firstError = errors.map((error) => error.msg)[0]
		return res.status(400).json({error: firstError})

	}
	// proceed to next middleware
	next();
}

