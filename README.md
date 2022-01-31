# Daily Planner App

This is a simple little application for planning your work day. You have the ability to create
tasks and to-dos for yourself. The beauty of this application is that the items you save to the corresponding time
wiil still be there even if you refresh the page!

This is done by saving the value of what you enter to localStorage in the browser. The only way your items could be lost, is if you manually clear your localStorage. 

----
<br />

## Link to Application
<br />

https://n-r-martin.github.io/day-planner-app/

<br />

----

<br />

## localStorage Demo
<br />

### Pre-Save:

![Example showing that a value has been entered but not saved](screengrabs/preSave.png)

<br />

### Post-Save UI:

![Example showing that a value has been saved to the UI](screengrabs/postSaveUI.png)

<br />

### Post-Save localStorage Panel:

![A screenshot showing the localstorage panel with a value saved](screengrabs/postSaveConsole.png)

----

<br />

The clock also updates every minute using moment.js. This third-party library is also used to determine what the current hour is so it can style the time blocks based on whether they are current, in the past, or in the future. 

<br />

### Example of Time Block Color Coding:

![Example of the color coding for the time blocks](screengrabs/stylesDemo.png)