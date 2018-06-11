

/* Taipei Weather Application */

const mainForm = document.querySelector('.main-form');
const selection = document.querySelector('select.input');
const input = document.querySelector('input.input');
const dataDelayTime = 300; // delay for api to deliver code before displaying it to DOM

const searchForm = document.querySelector('#main-screen .main-form');

let results = ""; // result of weather api data 

// event listener for weather search form submit 
searchForm.addEventListener('submit', e => {
    // prevent default form submission page refresh
    e.preventDefault();


    // let data load before displaying on DOM
    const outputArea = document.getElementById('output-wrap');
    setTimeout(() => outputArea.classList.add('show'), dataDelayTime+200);

    // if user has not put specific input value use drop down
    if(input.value === "") {
        weatherData(selection.value, "main", "temp");

        // display at output of DOM
        const output = document.getElementById("output");
        setTimeout(() => output.innerHTML += results+"&#8451", dataDelayTime); 
    } 
    // if user has entered city name in input prioritize that
    else {
        // clear display first 
        output.innerHTML = "";
        
        // target sort-options div and child input elements
        const sortOptionSection = document.getElementById("sort-options");
        const sortOptions = sortOptionSection.getElementsByTagName('input'); 

        // store info on which are checked and what information to display
        let displayInfo = []; 

        for(let i=0; i<sortOptions.length; i++) {
            
            // if search option is checked 
            if(sortOptions[i].checked) {
                displayInfo.push(sortOptions[i].value); // add them to displayInfo
            }
        }

        // display the information 
        for(let i=0; i<displayInfo.length; i++) {
            setTimeout(() => {
                //console.log(`displaying info for ${displayInfo[i]}`);
                weatherData(input.value, "main", displayInfo[i]);

                
                const output = document.getElementById("output");
                const outputTitle = document.querySelector("#output-wrap .output-title");

                // display at output of DOM
                output.innerHTML += results+"&#8451 ";
                outputTitle.innerHTML = `${input.value} Weather Information`;

            }, 200+(i*1000));
        }
            
    }
});






// get weather api data 

function weatherData(cityName, property, subProperty) {
    
    // fetch weatherAPI data based on city mentioned in param
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=e0bfa93ff9faee9a75a0d5f36bd11546&units=metric`)
    .then(result => result.json())
    .then(data => { 
        results = data[property][subProperty];
    });                                    

    // return results
    return results;
}
