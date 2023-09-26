import express from "express";

const app = express();
const port = 3001 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("Main Route reverted");
});

app.listen(port, () => {
  console.log(`[index.js]: App running on port ${port}`);
});
