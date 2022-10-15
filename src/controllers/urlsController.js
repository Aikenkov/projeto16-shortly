import connection from "../database/database.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdef", 6);

async function insertUrlsShorten(req, res) {
    const { url } = req.body;
    const isUrl = /^https:\/\//i.test(url);
    const shortUrl = nanoid();

    if (!isUrl) {
        console.log("Invalid URL!");
        return res.sendStatus(STATUS_CODE.UNPROCESSABLE_ENTITY);
    }

    console.log(shortUrl);

    res.status(STATUS_CODE.CREATED).send("ok");
}

export { insertUrlsShorten };
