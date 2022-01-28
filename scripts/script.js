///// VARIABLES /////

// DOM Elements
const currentDateElement = $('#current-day');



// MomentJS Variables
currentDate = moment().format("MMM Do, YYYY"); 


currentDateElement.text(currentDate);


