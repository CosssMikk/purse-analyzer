const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');

const item = "BOOSTER_COOKIE"

    async function getproductdata() {
        const response = await fetch(`https://api.slothpixel.me/api/skyblock/bazaar/${item}`);
        const data = await response.json();
        const { quick_status } = data;
        let number1 = quick_status.sellPrice
        let num1 = number1.toFixed(1);
        let number2 = quick_status.buyPrice
        let num2 = number2.toFixed(1);
        console.log(`The Current buy price for ${item} is ${num2} and the sell price is ${num1}`);
        
        let finalB = `${num2}`;

        fs.writeFileSync("buy.json", '[{"BPrice":"' + finalB + '"}]', JSON.stringify());

        let finalS = `${num1}`;

        fs.writeFileSync("sell.json", '[{"SPrice":"' + finalS + '"}]', JSON.stringify());
    }
    getproductdata();