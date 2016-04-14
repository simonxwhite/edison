var LCD = require('jsupm_i2clcd');
var myLcd = new LCD.Jhd1313m1 (0, 0x3E, 0x62);

var messages = [['Old Mc Donald', 'Had A farm', [18,239,99]],
                 ['Eee I Eee I Oh', 'an on that farm he had a ', [18,239,99]],
                 ['DUck', 'There a quack everwhere a quack quack', [18,239,99]]];
var pos = 0;

setInterval(function() {
 var message=messages[pos];
 myLcd.setColor(message[2][0],message[2][1], message[2][2]);
 myLcd.clear();
 myLcd.setCursor(0,0);
 myLcd.write(message[0]);
 myLcd.setCursor(1,2);
 myLcd.write(message[1]);
 if (pos === messages.length -1) pos = 0;
 else pos ++;
}, 2000);

var upmBuzzer = require("jsupm_buzzer");
// Initialize on GPIO 3
var myBuzzer = new upmBuzzer.Buzzer(3);
var song = [
  {tone: upmBuzzer.FA, ms: 400, note: 'FA'},
  {tone: upmBuzzer.FA, ms: 400, note: 'FA'},
  {tone: upmBuzzer.FA, ms: 400, note: 'FA'},
  {tone: upmBuzzer.DO, ms: 400, note: 'DO'},
  {tone: upmBuzzer.RE, ms: 400, note: 'RE'},
  {tone: upmBuzzer.RE, ms: 400, note: 'RE'},
  {tone: upmBuzzer.DO, ms: 400, note: 'DO'},
  {tone: upmBuzzer.DO, ms: 800, note: 'DO'},
  {tone: upmBuzzer.LA, ms: 400, note: 'LA'},
  {tone: upmBuzzer.SOL, ms: 400, note: 'SOL'},
  {tone: upmBuzzer.SOL, ms: 400, note: 'SOL'},
  {tone: upmBuzzer.FA, ms: 1200, note: 'FA'}
];

function play () {
  var i = 0;

  function note(){
    var t = song[i];
    setTimeout(function() {myBuzzer.playSound(t.tone, t.ms);}, t.ms)
    setTimeout(function() {
      if(i === song.length -1) i = 0;
      else i++;
      note()
    }, t.ms);
  }
  note();
}

play();

process.on('SIGINT', function() {
  console.log("Exiting...");
  process.exit(0);
});
