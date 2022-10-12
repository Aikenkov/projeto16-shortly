import connection from "../database/database.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { postRentalsSchema } from "../schemas/postRentalsSchema.js";

async function verifyPostGame(req, res, next) {
    /*  const {  } = req.body;

    const validation = postRentalsSchema.validate(
        {
           
        },
        { abortEarly: false }
    );
    if (validation.error) {
        const erros = validation.error.details.map(
            (details) => details.message
        );
        return res.status(STATUS_CODE.BAD_REQUEST).send(erros);
    } */

    try {
        //    res.locals.price = game.pricePerDay;
    } catch (error) {
        console.error(error.message);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

    next();
}

export default verifyPostGame;
