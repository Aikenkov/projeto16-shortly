import { STATUS_CODE } from "../enums/statusCode.js";

async function validateJoi(req, res, next, schema) {
    const body = req.body;
    console.log(body);

    const validation = schema.validate(
        {
            body,
        },
        { abortEarly: false }
    );

    if (validation.error) {
        const erros = validation.error.details.map(
            (details) => details.message
        );
        return res.status(STATUS_CODE.BAD_REQUEST).send(erros);
    }

    next();
}

export default validateJoi;
