import express from "express";
import cors from "cors";
import helmet from "helmet";
import * as dotenv from "dotenv";
dotenv.config();
import { connectToDb } from "./db/connect";
import { todoRoutes } from "@/routes";

const app = express();
const port: number = parseInt(process.env.PORT!);

// Connect to the database
connectToDb();

// Initialize Middlewares

// Cross origin resouce sharing - defines how resources defined in one domain can be used by other domains
// Empty means can be accessed by anyone
app.use(cors());

// Secures an app by setting response headers
app.use(helmet());

// Allows app to parse JSON data
app.use(express.json());

// Parses URL Encoded data and provides it in req.body
app.use(express.urlencoded({ extended: true }));

connectToDb();

app.use("/api", todoRoutes);

app.get("/", (req, res) => {
  res.send("Main Route reverted");
});

app.listen(port, () => {
  console.log(`[index.ts]: App running on port ${port}`);
});
