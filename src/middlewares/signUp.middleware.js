import connection from "../database/database.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { signUpSchema } from "../schemas/authSchemas.js";

async function validateSignUp(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;

    const validation = signUpSchema.validate(
        {
            name,
            email,
            password,
            confirmPassword,
        },
        { abortEarly: false }
    );

    if (validation.error) {
        const erros = validation.error.details.map(
            (details) => details.message
        );
        return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(erros);
    }

    try {
        const user = await connection.query(
            `
        SELECT * FROM users WHERE email = $1
        `,
            [email]
        );

        if (user.rowCount > 0) {
            return res.sendStatus(STATUS_CODE.CONFLICT);
        }
    } catch (error) {
        console.error(error.message);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

    next();
}

export default validateSignUp;
