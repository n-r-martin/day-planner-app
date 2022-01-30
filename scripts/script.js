///// VARIABLES /////

// DOM Elements
const currentDateElement = $('#current-day');
const currentTimeElement = $('#current-time');
let currentDate = moment().format('LL'); 
let currentTime = moment().format('h:mm A');

currentDateElement.text(currentDate);
currentTimeElement.text(currentTime);

const timeblockList = $('#timeblock-list');

// counter for data-hour so it increments and later matches the military hour for styling purposes
let dataHour = 8;

// This determines how many time there will be and also assigns their times
const blockTimes = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


/// TIMEBLOCK DATA - FED TO THE HTML
// Need to pull from local storage - first requires a default value? WHat if the user clears local storage? How to ensure everything maps correctly
const timeblockObjArr = [{
    "text" : 'Hello'
    },
    {
    "text" : 'these'
    },
    {
    "text" : 'are'
    },
    {
    "text" : 'examples'
    },
    {
    "text" : ''
    },
    {
    "text" : ''
    },
    {
    "text" : ''
    },
    {
    "text" : ''
    },
    {
    "text" : ''
    },
    {
    "text" : ''
    },
    {
    "text" : ''
    }
]



///// FUNCTIONS /////

function init() {
    // Looping through the Object Array to populate the UI and the current values therein
    for (let i = 0; i < blockTimes.length; i++) {
        createTimeblocks(blockTimes, i);
    }

    //First application of timeblock styles
    updateTimeblockStyles();
}

// Function to render the time blocks to the timeList element
function createTimeblocks(array, i) {
    let timeblock = $('<li>').addClass('timeblock-row');
    let timeElement = $('<div>').addClass('hour-container');
    let rowTime = $('<span>').addClass('hour');
    let userEntry = $('<textarea>').addClass('text-entry');
    let saveButton = $('<button>').addClass('save-btn');

    timeblock.attr('data-hour', dataHour);
    dataHour++;

    saveButton.html('<i class="far fa-save"></i>');

    let amPM = ''
    if (dataHour > 12) {
        amPM = ' PM'
    } else {
        amPM = ' AM'
    }

    rowTime.text(blockTimes[i] + amPM);
    userEntry.text(array[i].text)

    timeblockList.append(
        timeblock.append(timeElement.append(rowTime))
        .append(userEntry)
        .append(saveButton)); 
}

// Getting the seconds that have elapsed within the current minute once the page loads, this will be subtracted from 60 in the interval for the first run only...
var timeToUpdate = parseInt(moment().format('s'));
timeToUpdate = (60 - timeToUpdate) * 1000;
console.log((timeToUpdate / 1000) + ' seconds until next update');


const update = function () {
     //once the first cycle of update is run, set timeToUpdate to be exactly 60 seconds at the start of each subsequent cycle
    timeToUpdate = 60 * 1000;
    updateTimeAndDate();
    console.log('updating timeblock styles...');
    console.log((timeToUpdate / 1000) + ' seconds until next update');
    updateTimeblockStyles();

    //set the timeout with the new timeToUpdate variable
    setTimeout(update, timeToUpdate);
}

setTimeout(update, timeToUpdate);

// Function for updating time (and date at midnight);
function updateTimeAndDate() {
    console.log('updating time and date...');
    currentDate = moment().format('LL'); 
    currentTime = moment().format('h:mm A');
    updateTimeAndDateElements();   
}

// Push the updated time and date to the UI
function updateTimeAndDateElements() {
    currentDateElement.text(currentDate);
    currentTimeElement.text(currentTime);
}

// Function to update the timeblock styles both on initial creation and every minute
// If hour is a new hour, styles are updated to reflect that
function updateTimeblockStyles() {
    const currentMilitaryHour = moment().format('H');
    const parsedMilitaryHour = parseInt(currentMilitaryHour, 10);

    $('.timeblock-row').each( function(i) {
        const timeContainer = $(this).children('.hour-container');
        const dataHour = $(this).attr('data-hour');
        const parsedDataHour = parseInt(dataHour, 10);

        console.log(parsedDataHour);
        console.log(parsedMilitaryHour);
        if (parsedDataHour < parsedMilitaryHour) {
            timeContainer.removeClass('present future');
            timeContainer.addClass('past');
        } else if (parsedDataHour === parsedMilitaryHour) {
            timeContainer.removeClass('past future');
            timeContainer.addClass('present');
        } else if (parsedDataHour > parsedMilitaryHour) {
            timeContainer.removeClass('present past');
            timeContainer.addClass('future');
        }
    })
}



///// APPLICATION GO BRRRRR >>>>>>>

init();



// Text areas are just text by default populated from localStorage
// When text areas are clicked into, they become editable
// When the corresponding save button is clicked, the new value of the text area is written to localStorage and the values or values are refreshed
// Need arrays in javascript - taken from the correct index to map to the localstorage array
// Do we prep the whole array when any save button is clicked? stringify it and send to localStorage