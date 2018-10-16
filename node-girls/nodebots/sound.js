// Make button controls the LED and PIEZO
var five = require('johnny-five');
var board = new five.Board();
var songs = require('j5-songs');

board.on('ready', function() {
  var leds = new five.Leds([12]);
  var buttons = new five.Buttons({
    pins: [13],
    invert: true
  });
  var piezo = new five.Piezo(11);

  buttons.on('press', function(button) {
    var index = buttons.indexOf(button);
    leds[index].on();
    //piezo.play({ song: 'C4' });
    piezo.play(songs.load('pacman'));
  });

  buttons.on('release', function(button) {
    var index = buttons.indexOf(button);
    leds[index].off();
    piezo.off();
  });
});