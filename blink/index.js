var mraa = require('mraa');
var led = new mraa.Gpio(13);
led.dir(mraa.DIR_OUT);

var state = 0;

function blink() {
  state = state === 0 ? 1 : 0;
  led.write(state);
  setTimeout(blink, 100);
}

blink();

