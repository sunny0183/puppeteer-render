const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const { version } = require("./package.json");
const app = express();

const PORT = process.env.PORT || 4000;
//const version = process.env.npm_package_version || 'No Version Found!';


app.get("/scrape", (req, res) => {
  scrapeLogic(res);
});

app.get("/", (req, res) => {
  res.send(`Render Puppeteer server is up and running on Port ${PORT} ! Version : ${version}`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
