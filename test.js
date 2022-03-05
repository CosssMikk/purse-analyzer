const express = require("express");
const { google } = require("googleapis");
const program = require('./main.js');

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const {date, purseS, purseB } = req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1zN7gx5qjniZ_2XPRYuZ9SzCLctJadAd5QUL4bw9gxH0";
  
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "PurseV!A:A",
  });

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "PurseV!A:C",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[date, purseS, purseB]],
    },
  });

res.send("Successfully submitted! Thank you!");
});

app.listen(`7778`, (req, res) => console.log("yes"));

console.log(`${Date()}`)