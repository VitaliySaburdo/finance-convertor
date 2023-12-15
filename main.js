const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

const input = document.querySelector("#input");
const result = document.querySelector("#result");
const select = document.querySelector("#select");

const rates = {};

async function fetcData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const result = await data;
    console.log(result);
    rates.USD = result[24].rate;
    rates.EUR = result[31].rate;
    rates.GBP = result[23].rate;
  } catch (error) {
    console.log(error);
  }

  elementUSD.textContent = rates.USD.toFixed(2);
  elementEUR.textContent = rates.EUR.toFixed(2);
  elementGBP.textContent = rates.GBP.toFixed(2);
}

fetcData();
setInterval(fetcData, 100000);

input.oninput = convertValue;
select.oninput = convertValue;

function convertValue() {
  result.value = (input.value / rates[select.value]).toFixed(2);
}
