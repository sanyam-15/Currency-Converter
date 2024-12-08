const BASE_URL ="https://api.exchangerate-api.com/v4/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const body =document.querySelector(".container");

for (let select of dropdowns) {
for (currCode in countryList) {
 let newOption = document.createElement("option");
 newOption.innerText = currCode;
 newOption.value = currCode;
 if (select.name === "from" && currCode === "USD") {
   newOption.selected = "selected";
 } else if (select.name === "to" && currCode === "INR") {
   newOption.selected = "selected";
 }
 select.append(newOption);
}

select.addEventListener("change", (evt) => {
 updateFlag(evt.target);
});
}

const updateExchangeRate = async () => {
let amount = document.querySelector(".amount input");
let amtVal = amount.value;
if (amtVal === "" || amtVal < 1) {
 amtVal = 1;
 amount.value = "1";
}
try{
const URL = `${BASE_URL}/${fromCurr.value}`;
msg.innerText="Fetching Exchange Rates..."
let response = await fetch(URL);
let data = await response.json();
console.log(data);
let rate = data.rates[toCurr.value];
let finalAmount = (amtVal * rate).toFixed(2);
if(typeof rate  === undefined)
  {
    msg.innerText="Exchange rates are not available for specified country";
  }else{
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;}
}
catch(error){
 body.innerHTML=`<h2> Network error uable to fetch exchange rates!! </h2>`
}
};

const updateFlag = (e) => {
let currCode = e.value;
let countryCode = countryList[currCode];
let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
let img = e.parentElement.querySelector("img");
img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
evt.preventDefault();
updateExchangeRate();
});

window.addEventListener("load", () => {
updateExchangeRate();
});
