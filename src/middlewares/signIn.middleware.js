import connection from "../database/database.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { signInSchema } from "../schemas/authSchemas.js";

async function verifySignIn(req, res, next) {
    const { password, email } = req.body;

    const validation = signInSchema.validate(
        {
            email,
            password,
        },
        { abortEarly: false }
    );

    if (validation.error) {
        const erros = validation.error.details.map(
            (details) => details.message
        );
        return res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(erros);
    }

    const user = await connection.query(
        `
    SELECT * FROM users WHERE email = $1
    `,
        [email]
    );
    if (user.rowCount === 0) {
        return res
            .status(STATUS_CODE.UNAUTHORIZED)
            .send({ message: "Email ou senha incorretos" });
    }

    res.locals.user = user.rows[0];

    next();
}

export default verifySignIn;
