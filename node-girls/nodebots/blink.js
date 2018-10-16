var five = require("johnny-five");
var board = new five.Board();

//Example 1: Simple LED blink
/*board.on("ready", function() {

  // Number of the pin connected on the board
  var pinNumbers = [12];

  // Starting the LED
  var leds = new five.Leds(pinNumbers);

  // And here is the magic! \o/
  leds.blink();
});*/

//Check button functionality 
/*
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var pinButtons = [13];
  var buttons = new five.Buttons(pinButtons);

  buttons.on("press", function(button) {
    console.log("Pressed: ", button.pin);
  });

  buttons.on("release", function(button) {
    console.log("Released: ", button.pin);
  });
});*/

//Blink with buttons
board.on('ready', function() {
    var leds = new five.Leds([12]);
    var buttons = new five.Buttons({
      pins: [13],
      invert: true
    });
  
    buttons.on('press', function(button) {
      var index = buttons.indexOf(button);
     // leds[index].on();
      leds.off();
      console.log('presssed', leds[index].pin);
    });
  
    buttons.on('release', function(button) {
      var index = buttons.indexOf(button);
      //leds.off();
      leds.on();
      console.log('released');
    });
  });  
