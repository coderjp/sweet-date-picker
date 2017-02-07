# Sweet Date Picker

**This readme is a work in progress**

Sweet Date Picker is a modern date picker that works on desktops and mobile devices. It was created out of frustration of other date pickers not working on all screen sizes / devices. Those that did, had a dated user interface.

## Installation

You can install Sweet Date Picker using Bower

```
bower install sweet-date-picker
```

Sweet Date picker depends on the [Moment.js] library. Bower will install this as a dependency if you don't already have it. Don't forget to add Moment.js into you application.

## Browser Support

- IE 9, 10, 11
- Chrome
- Firefox
- iOS (Versions to be confirmed)
- Chrome on Android

## How To Use

Sweet Date Picker is bound to a text field ```<input type="text">```. To add the date picker to the text input, you can add the following in your JavaScript.

```
    sdp(document.querySelector('#myDate'));
```

Clicking on the text input will now open the date picker.

## Configuration

Config options can be added as the second parameter.

```
sdp(document.querySelector('#myDate', {
    displayFormat: 'MMMM Do' // January 1st
));
```

### Options

| Option            | Default                  | Type       | Comment                           |
|-------------------|--------------------------|------------|-----------------------------------|
|format             | D M YYYY                 | String     |The format that should be used when the date picker is opened. Each segment must be seperated by a space. The tokens used are those of Moment.js http://momentjs.com/docs/#/displaying/format/|
|displayFormat      | dddd, MMMM Do YYYY       | String     | The format of the date shown in the input when the date picker is closed.|
|submitFormat       | YYYY-MM-DD               | String     | When a form is submitted, the format of the date that should be submitted.
|allowInput         | true                     | Boolean    | Whilst the date picker is open, if the user clicks one of the numeric values instead of the up / down arrows, allow them to type the value. Note: This is disabled on mobile devices|
|tabFill            | true                     | Boolean    | If tabFill is true, once a user has used the keyboard to enter a value for the first segment, they are automatcially moved on to the next|
|showClear          | true                     | Boolean    | Show the clear button in the date picker|
|steps              | {}                       | Object     | Steps allows you to force certain segments to  increase / decrease in chunks instead of one at a time. Use the token in your display format to key the steps. For example ```` {YYYY : 2, M: 6}```` would make 1 click on the up arrow for the year increase it by 2, for the months it would increase it by 6.|
|debounceWait       | 400                      | Integer    | Holding an arrow will make the value increase / decrease rapidly. This value is how many milliseconds the user should hold the arrow before we start changing the value rapidly. If the user presses the arrow for any time under this value, then it is classed as a click and will increase / decrease it by 1.
|holdInterval       | 100                      | Integer    | How often in milliseconds we should change the value when an arrow is being held down. Increase it to slow down the rate or make it smaller to make the value change quicker.|
|maxDate            | undefined                | Moment     | Don't let the date picker go past this date. This is a moment instance, for example if you want to set the maxDate to today use ```{maxDate: moment()}```.

[Moment.js]: http://momentjs.com/