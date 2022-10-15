import connection from "../database/database.js";

import { STATUS_CODE } from "../enums/statusCode.js";

async function verifyAuth(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
    }

    try {
        /* const session = await db
            .collection(COLLECTIONS.SESSIONS)
            .findOne({ token });
        if (session === null) {
            return res.sendStatus(STATUS_CODE.BAD_REQUEST);
        } */

        const session = await connection.query(
            `
            SELECT * FROM sessions WHERE token = $1
        `,
            [token]
        );
        if (session.rowCount === 0) {
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }

        res.locals.session = session;
        next();
    } catch (error) {
        return res.status(STATUS_CODE.SERVER_ERROR).send(error.message);
    }
}

export default verifyAuth;
