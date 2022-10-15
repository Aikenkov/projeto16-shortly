import connection from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { STATUS_CODE } from "../enums/statusCode.js";

async function signUp(req, res) {
    const { name, email, password } = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        await connection.query(
            `
        INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
        `,
            [name, email, passwordHash]
        );

        res.sendStatus(STATUS_CODE.CREATED);
    } catch (error) {
        console.error(error.message);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

async function signIn(req, res) {
    const { password } = req.body;
    const user = res.locals.user;

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        return res
            .status(STATUS_CODE.UNAUTHORIZED)
            .send({ message: "Email ou senha incorretos" });
    }
    const token = uuid();

    try {
        const exist = await connection.query(
            `
            SELECT * FROM sessions WHERE "userId" = $1
         `,
            [user.id]
        );

        if (exist.rowCount > 0) {
            await connection.query(
                `
            UPDATE sessions SET token = $1 WHERE id = $2
            `,
                [token, user.id]
            );

            return res.send({ token });
        }

        await connection.query(
            `
        INSERT INTO sessions ("userId", token) VALUES ($1, $2)
        `,
            [user.id, token]
        );

        return res.status(STATUS_CODE.OK).send({ token });
    } catch (error) {
        console.error(error.message);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

async function getMyUser(req, res) {
    const session = res.locals.session;

    try {
        const userMe = (
            await connection.query(
                `
            SELECT 
             users.id,
             users.name,
             SUM(urls."visitCount") AS "visitCount"
               FROM users
               JOIN urls ON urls."userId" = users.id
               WHERE users.id = $1
               GROUP BY users.id
        `,
                [session.userId]
            )
        ).rows[0];

        const userMeUrls = (
            await connection.query(
                `
            SELECT
                urls.id,
                urls."shortUrl",
                urls.url,
                urls."visitCount"                      
              FROM urls
               WHERE urls."userId" = $1
                `,
                [session.userId]
            )
        ).rows;

        res.status(STATUS_CODE.OK).send({
            ...userMe,
            shortenedUrls: [...userMeUrls],
        });
    } catch (error) {
        console.error(error.message);
        res.sendStatus(STATUS_CODE.SERVER_ERROR);
    }
}

export { signUp, signIn, getMyUser };
