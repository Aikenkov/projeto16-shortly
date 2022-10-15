import connection from "../database/database.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdef", 6);

async function insertUrlsShorten(req, res) {
    const { url } = req.body;
    const isUrl = /^https:\/\//i.test(url);
    const shortUrl = nanoid();
    const session = res.locals.session;

    console.log(session);

    if (!isUrl) {
        console.log("Invalid URL!");
        return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);
    }

    console.log(shortUrl);

    try {
        await connection.query(
            `
        INSERT INTO urls ("userId", "shortUrl", "url") 
        VALUES ($1, $2, $3)
        `,
            [session.userId, shortUrl, url]
        );
    } catch (error) {
        console.error(error.message);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }

    res.status(STATUS_CODE.CREATED).send({ shortUrl });
}

async function getUrlById(req, res) {
    const { id } = req.params;

    try {
        const url = await connection.query(
            `
        SELECT id, "shortUrl", "url" FROM urls WHERE id = $1
        `,
            [id]
        );

        if (url.rowCount === 0) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND);
        }

        res.status(STATUS_CODE.OK).send(url.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export { insertUrlsShorten, getUrlById };
