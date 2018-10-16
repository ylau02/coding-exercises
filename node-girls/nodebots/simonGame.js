// Make button controls the LED and PIEZO
var five = require('johnny-five');
var board = new five.Board();
var piezoSongs = ['C4', 'E4'];
var songs = require('j5-songs');

var buttonCounter = 0;
var piezoSongs = ['C4', 'E4'];
var buttonsSequence = [];
var leds = [];
var piezo = {};
var timeoutIds = [];
/**
 * Returns randomic integer based on a range
 * min: minimum value
 * max: maximum value
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  /**
   * Generates a random number
   */
  function generateRandomNumber() {
    return getRandomInt(0, 1);
  }
  
  /**
   * Starts the simon game
   */
  function startGame() {
    console.log('STARTING...');
    buttonCounter = 0;
    buttonsSequence = [];
  
    // starts with 3 choices
    buttonsSequence.push(generateRandomNumber());
    buttonsSequence.push(generateRandomNumber());
    buttonsSequence.push(generateRandomNumber());
  
    blinkLedsInSequence();
  }

  /**
 * Makes the LED Blink in sequence and Piezo emit a sound based on
 * the order added in memory
 */
function blinkLedsInSequence() {
    var sequenceLength = buttonsSequence.length;
    var currentButtonSequenceCounter = 0;
  
    timeoutIds.push(
      setTimeout(function() {
  
        currentButtonSequenceCounter = buttonsSequence[buttonCounter];
        // This console shows you the current sequence in the memory game
        buttonCounter++;
        console.log('SEQUENCE NUMBER', buttonCounter, ': CLICK BUTTON', currentButtonSequenceCounter);
        if(buttonCounter < sequenceLength) {
          // turning turn led
          blinkLedsInSequence();
        } else {
          // This console shows you the current sequence in the memory game
          console.log('START GAME: ', buttonsSequence);
          buttonCounter = 0;
        }
  
        leds[currentButtonSequenceCounter].on();
        piezo.play({ song: piezoSongs[currentButtonSequenceCounter] });
  
        // turning off led
        timeoutIds.push(
          setTimeout(function() {
            leds.off();
            piezo.off();
          }, 1000));
  
      }, 2000));
  };


board.on('ready', function(){
    leds = new five.Leds([12, 3]);
    var buttons = new five.Buttons([13, 2]);
    piezo = new five.Piezo(11);

    buttons.on('press', function(button){
        /*var index = buttons.indexOf(button);
        leds[index].on();
        piezo.play({ song: piezoSongs[index] });
        console.log('Pressed: btn', button.pin);*/
        if (buttonsSequence.length) {
            var index = buttons.indexOf(button);
      
            console.log('Pressed: button', button.pin, 'led', leds[index].pin);
      
            // How can I turn on a specific LED?
            leds[index].on();
            piezo.play({ song: piezoSongs[index] });
          }
    })
    buttons.on('release', function(button){

        if (buttonsSequence.length) {
            var index = buttons.indexOf(button);
      
            console.log('Released: button', button.pin, 'led', leds[index].pin);
      
            // How can I turn off LEDS and Piezo?
            leds.off();
            piezo.off();

            if(buttonsSequence[buttonCounter] === index) {
              buttonCounter++;
              if(buttonCounter === buttonsSequence.length) {
                console.log('>>> You won!');
                buttonCounter = 0;
                buttonsSequence.push(generateRandomNumber());
                piezo.play(songs.load('jingle-bells-short'));
                setTimeout(blinkLedsInSequence,5000);
                //blinkLedsInSequence();
                //piezo.play(songs.load('do-re-mi'))
              }
            } else {
              timeoutIds.forEach(function(timeoutId) {
                clearTimeout(timeoutId);
              });
      
              console.log('>>> Error in sequence. try again!');
              piezo.play(songs.load('pacman'));
              setTimeout(startGame, 5000);
            }
          }
        });
      // Starting the game
    setTimeout(startGame, 100);
    });