let hasCalculated = false;
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const currencyFirstE1 = document.getElementById("currency-first");
const worthFirstE1 = document.getElementById("worth-first");
const currencySecondE1 = document.getElementById("currency-second");
const worthSecondE1 = document.getElementById("worth-second");
const exchangeRateE1 = document.getElementById("exchange-rate");

for(let select of dropdowns){
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "currency-first" && currCode === "USD"){
            newOption.selected = "selected";
        } else if(select.name === "currency-second" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
 });

}
 const updateFlag = (element) =>{
    let corrCode = element.value;
    let countryCode = countryList[corrCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src= newSrc;
 };

  
    function updateRate(){
        fetch(`https://v6.exchangerate-api.com/v6/c075a635eb8d156b39f84643/latest/${currencyFirstE1.value}`)
        .then((res) => res.json())
        .then ((data) => {
            const rate = data.conversion_rates[currencySecondE1.value];
            //console.log(rate);
            exchangeRateE1.innerText = `1 ${currencyFirstE1.value} = ${rate} ${currencySecondE1.value}`;
        worthSecondE1.value = (worthFirstE1.value * rate).toFixed(2)

        });
        
        
    }

    btn.addEventListener("click", (e) => {
    e.preventDefault();
    updateRate();
    hasCalculated = true; 
    });


    // currencyFirstE1.addEventListener("change",updateRate);
    // currencySecondE1.addEventListener("change",updateRate);

    // worthFirstE1.addEventListener("input",updateRate);

    currencyFirstE1.addEventListener("change", () => {
    updateFlag(currencyFirstE1);
       if (hasCalculated) updateRate();
    });

    currencySecondE1.addEventListener("change", () => {
    updateFlag(currencySecondE1);
       if (hasCalculated) updateRate();
    });

    worthFirstE1.addEventListener("input", () => {
       if (hasCalculated) updateRate();
    });
