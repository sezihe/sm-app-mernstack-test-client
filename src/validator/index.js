import * as yup from 'yup';
import * as passwordValidator from 'password-validator';

const validateSignUpField = (...args) => {
    const type = args[0];
    return new Promise((resolve, reject) => {

        if (type === 'name') {
            // name validation.
            const yupSchema = yup.object().shape({
                name: yup.string().trim()
                    .matches(/[\w-]/i, "Name must contain only valid characters")
                    .min(3, "Name must be at least 3 characters")
                    .max(50, "Name must not be more than 50 characters")
                    .required("Name is required"),
            });
            const name = args[1];

            yupSchema.validate({ name }).then(success => {
                resolve({ passed: true });
            }).catch(error => {
                reject({ passed: false, errorMessage: error.errors[0] });
            });
        } else if (type === 'email') {
            // email validation.
            const yupSchema = yup.object().shape({
                email: yup.string().trim()
                    .min(5, "Email Address must be at least 5 characters")
                    .email("Please enter a valid email address!")
                    .required("Email Address is required"),
            });

            const email = args[1];
            yupSchema.validate({ email }).then(success => {
                resolve({ passed: true });
            }).catch(error => {
                reject({ passed: false, errorMessage: error.errors[0] });
            });

        } else if (type === 'password') {
            // password validation
            const passwordValidatorSchema = new passwordValidator();

            passwordValidatorSchema
                .is().min(6)
                .has().uppercase()
                .has().lowercase()
                .has().digits()
                .has().symbols();

            const password = args[1];
            const validPassword = passwordValidatorSchema.validate(password, { list: true });

            if (validPassword.length > 0) {
                switch (validPassword[0]) {
                    case "min":
                        reject({ passed: false, errorMessage: "Password must have at least 6 characters" });
                        break;
                    case "uppercase":
                        reject({ passed: false, errorMessage: "Password must contain an UpperCase Letter" });
                        break;
                    case "lowercase":
                        reject({ passed: false, errorMessage: "Password must contain an LowerCase Letter" });
                        break;
                    case "digits":
                        reject({ passed: false, errorMessage: "Password must contain a Number" });
                        break;
                    case "symbols":
                        reject({ passed: false, errorMessage: "Password must contain a Special Character" });
                        break;
                    default:
                        reject({ passed: false, errorMessage: "Password must contain at least: 1 Capital letter & Small letter, 1 Special character and a number" });
                }
            } else {
                resolve({ passed: true });
            }
        }
    })
};

export default validateSignUpField;