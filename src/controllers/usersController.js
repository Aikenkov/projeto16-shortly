import connection from "../database/database.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function signUp(req, res) {
    console.log(req.body);
    res.sendStatus(STATUS_CODE.CREATED);
}

export { signUp };
