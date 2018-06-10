

/* Taipei Weather Application */

const mainForm = document.querySelector('.main-form');
const selection = document.querySelector('select.input');
const input = document.querySelector('input.input');
const dataDelayTime = 200;


const mainScreen = document.getElementById('main-screen');
let forms = mainScreen.getElementsByTagName("form");

for(let i=0; i<forms.length; i++) {

    forms[i].addEventListener('submit', e => {
        // prevent form submission
        e.preventDefault();

        // let data load before displaying on DOM
        const outputArea = document.getElementById('output-wrap');
        setTimeout(() => outputArea.classList.add('show'), dataDelayTime);

        // if user has not put specific input value use drop down
        if(input.value === "") {
            weatherData(selection.value, "main", "temp");
        } 
        // if user has entered city name in input prioritize that
        else {
            weatherData(input.value, "main", "temp");
        }
    });

}






// get weather api data 
let results = ""; // result 

function weatherData(cityName, property, subProperty) {
    
    // fetch weatherAPI data based on city mentioned in param
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=e0bfa93ff9faee9a75a0d5f36bd11546&units=metric`)
    .then(result => result.json())
    .then(data => { 
        results = data[property][subProperty];
    });                                    
    
    // display at output of DOM
    const output = document.getElementById("output");
    const outputTitle = document.querySelector("#output-wrap .output-title");
    setTimeout(() => {
        output.innerHTML = results+"&#8451";
        outputTitle.innerHTML = cityName + " Temperature";
    }, dataDelayTime); 


}
