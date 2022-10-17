import connection from "../database/database.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdef", 6);

async function insertUrlsShorten(req, res) {
    const { url } = req.body;
    const isUrl = /^https:\/\//i.test(url);
    const shortUrl = nanoid();
    const session = res.locals.session;

    if (!isUrl) {
        console.error("Invalid URL!");
        return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);
    }

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

async function deleteUrlById(req, res) {
    const { id } = req.params;
    const session = res.locals.session;

    try {
        const url = await connection.query(
            `
        SELECT * FROM urls WHERE id = $1
        `,
            [id]
        );

        if (url.rowCount === 0) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND);
        }

        if (session.userId !== url.rows[0].userId) {
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
        }

        await connection.query(
            `
        DELETE FROM urls WHERE id = $1
        `,
            [id]
        );

        res.sendStatus(STATUS_CODE.NO_CONTENT);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

async function openShortUrl(req, res) {
    const { shortUrl } = req.params;
    try {
        const url = await connection.query(
            `
        SELECT * FROM urls WHERE "shortUrl" = $1
        `,
            [shortUrl]
        );

        if (url.rowCount === 0) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND);
        }

        await connection.query(
            `
         UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1 
        `,
            [shortUrl]
        );

        res.redirect(url.rows[0].url);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

async function getRanking(req, res) {
    try {
        const ranking = await connection.query(`
        SELECT
            users.id,
            users.name,
            COUNT(urls.id) AS "linksCount",
            SUM(COALESCE(urls."visitCount", 0)) AS "visitCount"
        FROM users LEFT JOIN urls
        ON urls."userId" = users.id
        GROUP BY users.id    
        ORDER BY "visitCount" DESC
        LIMIT 10
        `);
        res.send(ranking.rows);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export {
    insertUrlsShorten,
    getUrlById,
    deleteUrlById,
    openShortUrl,
    getRanking,
};
