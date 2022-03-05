//googlesheet.js

const { google } = require("googleapis");
const finalPrices = require('./finalPrices.json');
const express = require('express');
const app = express();
const { finalB, finalS} = require('./finalPrices.json');

var now = new Date();
var delay = 60 * 60 * 15;
// var delay = 60 * 60 * 1000; // 1 hour in msec
var start = delay - (now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds();

setTimeout(function apiSend() {

  //Date
const finalD = new Date().toLocaleString();


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("viewer");
});

app.post("/", async (req, res) => {

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

  let finalFinalB = finalB.replace(".",",");
  let finalFinalS = finalS.replace(".",",");

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "PurseV!A:C",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[finalD, finalFinalB, finalFinalS]],
    },
  });


res.send("Successfully submitted! Thank you!");
});
console.log(finalD);

  setTimeout(apiSend, delay)
}, start); 

app.listen(`7778`, (req, res) => console.log("yes"));

//main.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');
const { sheets } = require('googleapis/build/src/apis/sheets');


const item = "BOOSTER_COOKIE"

            var now = new Date();
            var delay = 60 * 60 * 13;
            // var delay = 60 * 60 * 1000; // 1 hour in msec
            var start = delay - (now.getMinutes() * 60 + now.getSeconds()) * 1000 + now.getMilliseconds();

        setTimeout(function apiRequest() {

            async function getproductdata() {
                const response = await fetch(`https://api.slothpixel.me/api/skyblock/bazaar/${item}`);
                const data = await response.json();
                const { quick_status } = data;
                let number1 = quick_status.sellPrice
                let num1 = number1.toFixed(1);
                let number2 = quick_status.buyPrice
                let num2 = number2.toFixed(1);


    //Fonctionnel 
        console.log(`The Current sell price for ${item} is ${num1} and the buy price is ${num2}`);
        
        let finalB = `${num2}`;
        
        finalPrices["finalB"] = finalB;
        fs.writeFileSync('finalPrices.json', JSON.stringify(finalPrices));

        let finalS = `${num1}`;

        finalPrices["finalS"] = finalS;
        fs.writeFileSync('finalPrices.json', JSON.stringify(finalPrices));
        
    }  getproductdata();

    setTimeout(apiRequest, delay)
    }, start); 