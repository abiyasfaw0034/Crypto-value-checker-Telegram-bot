const express = require("express");
const { handler } = require("./controller/lib");

const app = express();
app.use(express.json());

app.get("*", async (req, res) => {
  res.json(await handler(req));
});

app.post("*", async (req, res) => {
  console.log(req.body);
  res.json(await handler(req));
});

app.listen(4000, () => {
  console.log("server running on port 4000");
});
