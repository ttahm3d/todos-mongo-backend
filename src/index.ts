import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { connectToDb } from "./db/connect";

const app = express();
const port = 3001 || process.env.PORT;

connectToDb();

app.get("/", (req, res) => {
  res.send("Main Route reverted");
});

app.listen(port, () => {
  console.log(`[index.js]: App running on port ${port}`);
});
