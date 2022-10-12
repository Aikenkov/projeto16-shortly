import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(cors());
server.use(express.json());

server.get("/status", (req, res) => {
    res.send("Ok status");
});

server.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});
