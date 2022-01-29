///// VARIABLES /////

// DOM Elements
const currentDateElement = $('#current-day');
const timeblockList = $('#timeblock-list');
// const timeblock = $('.timeblock-row');



/// TIMEBLOCK DATA - FED TO THE HTML
const timeblockObjArr = [{
    "time" : '8 AM' ,
    "text" : 'Hello'
    },
    {
    "time" : '9 AM',
    "text" : 'these'
    },
    {
    "time" : '10 AM',
    "text" : 'are'
    },
    {
    "time" : '11 AM',
    "text" : 'examples'
    },
    {
    "time" : '12 PM',
    "text" : ''
    },
    {
    "time" : '1 PM',
    "text" : ''
    },
    {
    "time" : '2 PM',
    "text" : ''
    },
    {
    "time" : '3 PM',
    "text" : ''
    },
    {
    "time" : '4 PM',
    "text" : ''
    },
    {
    "time" : '5 PM',
    "text" : ''
    },
    {
    "time" : '6 PM',
    "text" : ''
    },
    {
    "time" : '7 PM',
    "text" : ''
    }
]



// MomentJS Variables
let currentDate = moment().format("MMM Do, YYYY"); 
currentDateElement.text(currentDate);


///// APPLICATION /////

// Looping through the Object Array to populate the UI and the current values therein
for (let i = 0; i < timeblockObjArr.length; i++) {
    createTimeblocks(timeblockObjArr, i);
}


///// FUNCTIONS /////

// Function to render the time blocks to the timeList element
function createTimeblocks(array, i) {
    let timeblock = $('<li>').addClass('timeblock-row');
    let timeElement = $('<div>').addClass('hour-container');
    let rowTime = $('<span>').addClass('hour');
    let userEntry = $('<textarea>').addClass('text-entry');
    let saveButton = $('<button>').addClass('save-btn');

    saveButton.html('<i class="far fa-save"></i>');

    rowTime.text(array[i].time);
    userEntry.text(array[i].text)

    timeblockList.append(
        timeblock.append(timeElement.append(rowTime))
        .append(userEntry)
        .append(saveButton));  
}


// Function to determine the styling of the timeblocks
// If timeblock is in the past for the day, style it a certain way
// If time block is current hour, style a certain way
// If time block is in the future, style it a certain way


// Text areas are just text by defaul populated from localStorage
// When text areas are clicked into, they become editable
// When the corresponding save button is clicked, the new value of the text area is written to localStorage and the values or values are refreshed
// Need arrays in javascript - taken from the correct index to map to the localstorage array
// Do we prep the whole array when any save button is clicked? stringify it and send to localStorage?