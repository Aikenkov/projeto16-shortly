import joi from "joi";

const signUpSchema = joi.object({
    name: joi.string().trim().min(1).strict().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).trim().strict().required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required(),
});

export { signUpSchema };
