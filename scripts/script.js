///// VARIABLES /////

// DOM Elements
const currentDateElement = $('#current-day');
const currentTimeElement = $('#current-time');
let currentDate = moment().format('LL'); 
let currentTime = moment().format('h:mm A');
currentDateElement.text(currentDate);
currentTimeElement.text(currentTime);
const timeblockList = $('#timeblock-list');

// Base Variables for functions
// counter for data-hour so it increments and later matches the military hour for styling purposes
let dataHour = 8;

// This determines how many time there will be and also assigns their times
const blockTimes = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6]

// This exists only for the sake if the user does not have the textAreaValues key in their localstorage.
// In which case, we need to see with this empty to avoid errors on functions that require some kind of parsed array from localstorage,
// even if it is empty. If the user already has the key, then the application data is fed entirely from localstorage
const emptyTimeblockTextObjArr = [{ "text" : ''}, { "text" : ''}, { "text" : ''}, { "text" : ''}, { "text" : ''}, { "text" : ''}, { "text" : ''}, { "text" : ''}, { "text" : ''}, { "text" : ''}, { "text" : ''}]
   


///// FUNCTIONS /////

function init() {
    // Looping through the Object Array to populate the UI and the current values therein
    for (let i = 0; i < blockTimes.length; i++) {
        createTimeblocks(blockTimes, i);
    }

    //First application of timeblock styles
    updateTimeblockStyles(); 

    // Checking to see if the key already exists, if not, set an empty object converted to a string to localstorage
    // If the key already, whether empty or not, bypass
    // This way, our storage is not emptied out on reload
    if (localStorage.getItem('textAreaValues') === null) {
        localStorage.setItem('textAreaValues', JSON.stringify(emptyTimeblockTextObjArr));
      }

    // Immediately parsing the string from storage, whether empty or not, so we can update values at the proper index, and send it back to storage
    parsedTextAreaValues = JSON.parse(localStorage.getItem('textAreaValues'));

    // Update the UI with the values of the parsed string from local storage to the corresponsing text areas
    updateTextAreaValues();
}

function updateTextAreaValues() {
    for (let i = 0; i < blockTimes.length; i++) {
        $('#' + [i]).text(parsedTextAreaValues[i].text); 
    }
}

// Function to render the timeblocks to the timeList ul element
function createTimeblocks(array, i) {
    let timeblock = $('<li>').addClass('timeblock-row');
    let timeElement = $('<div>').addClass('hour-container');
    let rowTime = $('<span>').addClass('hour');
    let userEntry = $('<textarea>').addClass('text-entry');
    userEntry.attr('placeholder', 'Enter a task here...')
    userEntry.attr('id', [i])
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

// Getting the seconds that have elapsed within the current minute once the page loads.
// This will be subtracted from 60 in the interval for the first cycle only,
// which is necessary to align the clock in the UI with the actual time
// Basically getting the UI running concurrently with actual time
var timeToUpdate = parseInt(moment().format('s'));
timeToUpdate = (60 - timeToUpdate) * 1000;
console.log((timeToUpdate / 1000) + ' seconds until next update');


const update = function (timeToUpdate) {
     //once the first cycle of update is run, set timeToUpdate to be exactly 60 seconds at the start of each subsequent cycle
    timeToUpdate = 60 * 1000;
    updateTimeAndDate();
    console.log('updating timeblock styles...');
    console.log((timeToUpdate / 1000) + ' seconds until next update');
    updateTimeblockStyles();

    //set the timeout with the new timeToUpdate variable
    setTimeout(update, timeToUpdate);

    return timeToUpdate;
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
// If hour is a new hour, timeblock styles are updated to reflect that
function updateTimeblockStyles() {
    const currentMilitaryHour = moment().format('H');
    const parsedMilitaryHour = parseInt(currentMilitaryHour, 10);

    $('.timeblock-row').each( function(i) {
        const timeContainer = $(this).children('.hour-container');
        const dataHour = $(this).attr('data-hour');
        const parsedDataHour = parseInt(dataHour, 10);

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



///// EVENT LISTENTERS //////

$('.save-btn').on('click', function () {
    const siblingTextArea = $(this).siblings('textarea')
    const siblingTextareaId = siblingTextArea.attr('id');
    const parsedId = parseInt(siblingTextareaId);

    parsedTextAreaValues[parsedId].text = siblingTextArea.val();
    localStorage.setItem('textAreaValues', JSON.stringify(parsedTextAreaValues));
})