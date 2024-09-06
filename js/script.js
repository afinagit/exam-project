
const citySelect = document.getElementById("citySelect");
const burgerBtn = document.getElementById('burgerBtn');
const closeBtn = document.getElementById('closeBtn');
const menu = document.getElementById('menu');
const brandSelect = document.getElementById("brandSelect");
const modelSelect = document.getElementById("modelSelect");
const currencySelect = document.getElementById("currencySelect")
const banSelect = document.getElementById("banSelect")
const allCars = document.getElementById("allCars")
const leftBanner = document.querySelector('.banner-left');
const rightBanner = document.querySelector('.banner-right');
const minInput = document.getElementById("minInput")
const maksInput = document.getElementById("maksInput")
const creditCheck = document.getElementById("creditCheck")
const barterCheck = document.getElementById("barterCheck")
const minSelect = document.getElementById('minSelect');
const maksSelect = document.getElementById('maksSelect');


function showMenu() {

    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
    closeBtn.style.display = "block"
    burgerBtn.style.display = "none"

}
function closeMenu() {

    menu.style.display = 'none';
    closeBtn.style.display = "none"
    burgerBtn.style.display = "block"


}



function show() {
    let kod = ""

    cars.forEach((item) => {

        kod += `<div class="card">
<div class="card-img"> <i class="fa-regular fa-heart" onclick="changeBg(this)"></i>
<img id="carImage" src="${item.images}" alt="${item.name}" style="width:100%; height:auto;"> </div>
 <div class="card-content">
    <p class="price">${item.price} ${item.currency} </p>
    <div class="brand-model">${item.brand} ${item.model}</div>
     <div>${item.year}, ${item.engine}L, ${item.odometer}${item.odometerUnit}</div>
      <div class="city">${item.city}</div>
       </div>  </div>`


    })
    allCars.innerHTML = kod;

}
show()

window.addEventListener('scroll', () => {

    const scrollY = window.scrollY;
    if (scrollY > 240) {
        leftBanner.classList.add('fixed');
        rightBanner.classList.add('fixed');
    } else {
        leftBanner.classList.remove('fixed');
        rightBanner.classList.remove('fixed');
    }
});



function getUniqueValues(array, key) {
    const uniqueValues = [];
    array.forEach(item => {
        if (!uniqueValues.includes(item[key])) {
            uniqueValues.push(item[key]);
        }
    });
    return uniqueValues;
}


function createOptions(selectElement, values) {
    let optionsHTML = "";
    values.forEach(value => {
        optionsHTML += `<option value="${value}">${value}</option>`;
    });
    selectElement.innerHTML = optionsHTML;
}


const uniqueBrands = getUniqueValues(cars, 'brand');
createOptions(brandSelect, uniqueBrands);


const uniqueModels = getUniqueValues(cars, 'model');
createOptions(modelSelect, uniqueModels);

const allCurrencies = getUniqueValues(cars, 'currency');
createOptions(currencySelect, allCurrencies);


const uniqueBan = getUniqueValues(cars, 'banType');
createOptions(banSelect, uniqueBan);

const uniqueCity = getUniqueValues(cars, 'city');
createOptions(citySelect, uniqueCity);


brandSelect.addEventListener('change', function () {
    if (brandSelect.value) {
        modelSelect.disabled = false
    }

    else {
        modelSelect.disabled = true
    }
})


let kod1 = "<option value=''></option>";
let kod2 = "<option value=''></option>";
for (let i = 2024; i > 1903; i--) {
    kod1 += `<option value="${i}">${i}</option>`

}
for (let i = 2023; i > 1903; i--) {

    kod2 += `<option value="${i}">${i}</option>`
}
maksSelect.innerHTML = kod1
minSelect.innerHTML = kod2



let odometerFilter = null;

function updateFilters(brand) {
    const filteredByBrand = cars.filter(car => car.brand === brand);


    const models = getUniqueValues(filteredByBrand, 'model');
    const cities = getUniqueValues(filteredByBrand, 'city');
    const banTypes = getUniqueValues(filteredByBrand, 'banType');
    const filteredCurrencies = getUniqueValues(filteredByBrand, 'currency');

    modelSelect.innerHTML = "<option value=''></option>";
    models.forEach(model => {
        const optionElement = document.createElement('option');
        optionElement.value = model;
        optionElement.textContent = model;
        modelSelect.appendChild(optionElement);
    });
    modelSelect.disabled = models.length === 0;

    citySelect.innerHTML = "<option value=''></option>";
    cities.forEach(city => {
        const optionElement = document.createElement('option');
        optionElement.value = city;
        optionElement.textContent = city;
        citySelect.appendChild(optionElement);
    });
    citySelect.disabled = cities.length === 0;

    banSelect.innerHTML = "<option value=''> </option>";
    banTypes.forEach(banType => {
        const optionElement = document.createElement('option');
        optionElement.value = banType;
        optionElement.textContent = banType;
        banSelect.appendChild(optionElement);
    });
    banSelect.disabled = banTypes.length === 0;


    currencySelect.innerHTML = "<option value=''></option>";
    allCurrencies.forEach(currency => {
        const optionElement = document.createElement('option');
        optionElement.value = currency;
        optionElement.textContent = currency;
        currencySelect.appendChild(optionElement);
    });
    currencySelect.disabled = allCurrencies.length === 0;



}


/* modelSelect.addEventListener('change', showAd);
citySelect.addEventListener('change', showAd);
banSelect.addEventListener('change', showAd);
creditCheck.addEventListener('change', showAd);
barterCheck.addEventListener('change', showAd);
minInput.addEventListener('input', showAd);
maksInput.addEventListener('input', showAd);
currencySelect.addEventListener('change', showAd);
minSelect.addEventListener('change', showAd);
maksSelect.addEventListener('change', showAd);
 */
function showAd() {

    const selectedBrand = brandSelect.value;
    const selectedModel = modelSelect.value;
    const selectedCity = citySelect.value;
    const selectedBan = banSelect.value;
    const selectedMinInput = minInput.value
    const selectedMaksInput = maksInput.value
    const selectedCurrency = currencySelect.value;
    const selectedMinYear = minSelect.value
    const selectedMaksYear = maksSelect.value
    const selectedCredit = creditCheck.checked ? true : '';
    const selectedBarter = barterCheck.checked ? true : '';

    const filteredCars = cars.filter(car => {
        const carYear = +(car.year);
        const matchOdometer = odometerFilter === null ||
            (odometerFilter === 'yeni' && car.odometer === 0) ||
            (odometerFilter === 'surulmus' && car.odometer > 0);
        return matchOdometer &&
            (!selectedBrand || car.brand === selectedBrand) &&
            (!selectedModel || car.model === selectedModel) &&
            (!selectedCity || car.city === selectedCity) &&
            (!selectedBan || car.banType === selectedBan) &&
            (selectedCredit === '' || car.credit === selectedCredit) &&
            (selectedBarter === '' || car.barter === selectedBarter) &&
            (!selectedMinInput || car.price >= selectedMinInput) &&
            (!selectedMaksInput || car.price <= selectedMaksInput) &&
            (!selectedCurrency || car.currency === selectedCurrency) &&
            (!selectedMinYear || car.year >= selectedMinYear) &&
            (!selectedMaksYear || car.year <= selectedMaksYear)
    
    });
/*     const allCars = document.getElementById('allCars'); */
    if (filteredCars.length === 0) {
        allCars.innerHTML = `<div class="notFoundText"> 
        <img class="notFoundImg" src="img/notfound.png" alt="Not Found"/>
        <p>Təəsüf ki, axtarışınız əsasında heç nə tapılmadı.</p>
         <p style="color:#333">Zəhmət olmasa, daha uyğun axtarış filterlərini seçin.</p></div>`
    } else {


        allCars.innerHTML = filteredCars.map(car => `
        <div class="card" style="max-width:236px">
            <div class="card-img"> <i class="fa-regular fa-heart" onclick="changeBg(this)"></i>
                <img src="${car.images}" alt="${car.brand} ${car.model}" style="width:100%; height:auto;">
            </div>
            <div class="card-content">
                <p class="price">${car.price} ${car.currency}</p>
                <div class="brand-model">${car.brand} ${car.model}</div>
                <div>${car.year}, ${car.engine}L, ${car.odometer}${car.odometerUnit}</div>
                <div class="city">${car.city}</div>
            </div>
        </div>
    `).join('');
    }
}

/* minSelect.addEventListener('change', function () {
    selectedMinYear = minSelect.value;
    showAd();
});

maksSelect.addEventListener('change', function () {
    selectedMaksYear = maksSelect.value;
    showAd();
});
*/

brandSelect.addEventListener('change', function () {
    updateFilters(brandSelect.value);
    showAd();
}); 



const yeniButton = document.getElementById("yeniButton")
const hamisiButton = document.getElementById("hamisiButton")
const surulmusButton = document.getElementById("surulmusButton")
function resetButtonStyles() {
    yeniButton.classList.remove('active');
    surulmusButton.classList.remove('active');
    hamisiButton.classList.remove('active');
    hamisiButton.style.backgroundColor = "#fff";
    hamisiButton.style.color = "var(--dark-blue)";

}

document.getElementById('yeniButton').addEventListener('click', function () {
    odometerFilter = 'yeni';
    resetButtonStyles();
    yeniButton.classList.add('active');

});

document.getElementById('surulmusButton').addEventListener('click', function () {
    odometerFilter = 'surulmus';
    resetButtonStyles();
    surulmusButton.classList.add('active');

});

document.getElementById('hamisiButton').addEventListener('click', function () {
    odometerFilter = null;
    resetButtonStyles();
    hamisiButton.classList.add('active');
});


function clearAll() {
    let card=document.querySelector(".card")
    brandSelect.value = "";
    modelSelect.value = "";
    citySelect.value = "";
    minInput.value = "";
    maksInput.value = "";
    currencySelect.value = "";
    banSelect.value = "";
    minSelect.value = "";
    maksSelect.value = "";
    creditCheck.checked = false;
    barterCheck.checked = false;
    odometerFilter = null;
    selectedMinYear = null;
    selectedMaksYear = null;
    
    
  
    resetButtonStyles();
    showAd();
    updateFilters()

    
}

document.getElementById('clear').addEventListener('click', clearAll);


function changeBg(elem) {
    if (elem.classList.contains('fa-regular')) {
        elem.classList.remove('fa-regular');
        elem.classList.add('fa-solid');
        elem.classList.add('solid');

    } else {
        elem.classList.remove('fa-solid');
        elem.classList.remove('solid');
        elem.classList.add('fa-regular');

    }
}