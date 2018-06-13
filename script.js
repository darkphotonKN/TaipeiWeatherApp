

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

    // var selectors 
    const outputArea = document.getElementById('output-wrap'); // output box
    const output = document.getElementById("output"); // data output location 
    const outputTitle = document.querySelector("#output-wrap .output-title"); // output title

    // let data load before displaying on DOM
    outputArea.classList.add('show');

    // if user has not put specific input value use drop down
    if(input.value === "") {
        weatherData(selection.value, "main", "temp");

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
        let dispInfo = "";
        let baseDelay = 100;
        let dispDelay = 0;
        let dispInterval = 150;
        let loadTime = 1000;
        for(let i=0; i<displayInfo.length; i++) {
            setTimeout(() => {
                //console.log(`displaying info for ${displayInfo[i]}`);
                 weatherData(input.value, "main", displayInfo[i]);

                // display at output of DOM
                setTimeout(()=> {
                    console.log(results); // test 
                    dispInfo += results+"&#8451 ";
                    outputTitle.innerHTML = `${input.value} Weather Information`;
                    dispDelay += (i*dispInterval);
                }, 200);

            }, baseDelay+(i*dispInterval));
        }
        setTimeout(() => output.innerHTML = dispInfo, (baseDelay+dispDelay+loadTime));
            
    }
});



// get weather api data 

function weatherData(cityName, property, subProperty) {
    
    // fetch weatherAPI data based on city mentioned in param
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=e0bfa93ff9faee9a75a0d5f36bd11546&units=metric`)
    .then(result => result.json())
    .then(data => { 
        results = data[property][subProperty];
        const output = document.getElementById("output");
        output.innerHTML = `.then loaded already ${results}`;
        
    });                                    

    // return results
    return results;
}
