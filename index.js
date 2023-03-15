import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
import { MongoClient } from "mongodb";
import moviesRouter from "./router/movies.router.js"
import userRouter from "./router/users.router.js"
import cors from 'cors';

const app = express();

const PORT = process.env.PORT;

const client = new MongoClient(process.env.MONGO_URL);
await client.connect();
console.log("Mongo is Connected!!!")

app.use(cors());
app.use(express.json());

app.get("/", function (request, response) {
  response.send("Hackathon 2");
});

app.use("/movies", moviesRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

export { client }