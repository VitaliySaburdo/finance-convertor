const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

const input = document.querySelector("#input");
const result = document.querySelector("#result");
const select_1 = document.querySelector("#select_1");
const select_2 = document.querySelector("#select_2");

const rates = { UAH: 1 };

for (let key in rates) {
  const option = document.createElement("option");
  option.textContent = key;
  select_1.appendChild(option);
}

async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const result = await data;
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

fetchData();
setInterval(fetchData, 100000);

function convertValue() {
  result.value = (input.value / rates[select.value]).toFixed(2);
}
