/*jslint browser:true */
"use strict";

function addMonths(elem) {
    let annualUseKw = 0;
    let dailyUseKw = 0;
    let i = 0;
    let x = 0;

    const months = document.getElementById(elem).getElementsByTagName('input');

    for (let i = 0; i < months.length; i++) {
        x = Number(months[i].value);
        annualUseKw += x;
    }

    dailyUseKw = annualUseKw / 365;

    return(dailyUseKw);
}

function sunHours() {
    let theZone = document.forms.solarForm.zone.selectedIndex;
    theZone += 1;
    let hrs;

    switch (theZone) {
        case 1:
            hrs = 6;
            break;
        case 2:
            hrs = 5.5;
            break;
        case 3:
            hrs = 5;
            break;
        case 4:
            hrs = 4.5;
            break;
        case 5:
            hrs = 4.2;
            break;
        case 6:
            hrs = 3.2;
            break;
        default:
            hrs = 0;
    }

    return hrs;
}


function calculatePanel() {
    let userChoice = document.forms.solarForm.panel.selectedIndex;
    let panelOptions = document.forms.solarForm.panel.options;
    let power = panelOptions[userChoice].value;
    let name = panelOptions[userChoice].text;
    let x = [power, name]
    return x;
}


function calculateSolar() {
    let dailyUseKw = addMonths('mpc');
    // console.log(dailyUseKw);

    let sunHoursPerDay = sunHours();
    // console.log(sunHoursPerDay)

    let minKwNeeds = dailyUseKw / sunHoursPerDay;
    // console.log(minKwNeeds);

    let realKwNeeds = minKwNeeds * 1.25;
    // console.log(realKwNeeds);

    let realWattNeeds = realKwNeeds * 1000;
    // console.log(realWattNeeds);

    let panelInfo = calculatePanel();
    let panelOutput = panelInfo[0];
    let panelName = panelInfo[1];
    // console.log(panelOutput);
    // console.log(panelName);

    let panelsNeeed = Math.ceil(realWattNeeds / panelOutput);
    // console.log(panelsNeeed)

    document.getElementById('feedback').innerHTML = `
    <p>Based on your average daily use of ${Math.round(dailyUseKw)} kWh, you will need to purchase ${panelsNeeed} ${panelName} solar panels to offset 100% of your electricity bill.</p>
    <h2>Additional Details</h2>
    <p>Your average daily electricity consuption: ${Math.round(dailyUseKw)} kwh per day.</p>
    <p>Average sunshine hours per day: ${sunHoursPerDay} hours</p>
    <p>Realistic watts needed per hour: ${Math.round(realWattNeeds)} watts/hour.</p>
    <p>the ${panelName} panel you selected generates about ${panelOutput} watts per hour.</p>
    `
}


