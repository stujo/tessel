"use strict";

var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port['A']);

ambient.on('ready', function () {

  var soundThresholds = [ 0.02, 0.05, 0.1, 0.2 ];

  var displayRange = function(rangeValues){
    
    var ledIndexes = [1 , 0, 3, 2];
    var myThresholds = rangeValues;
   
    return function(value){
      for(i = 0; i < myThresholds.length; i++)
      {
        tessel.led[ledIndexes[i]].write(value > myThresholds[i]);
      }
    };
  } 

  var soundDisplay = displayRange(soundThresholds);

  setInterval(function() {
    ambient.getSoundBuffer( function(err, data) {
      var average = data.reduce(function(memo,val){ return memo + val; }, 0) / data.length;
      soundDisplay(average);
   });
  }, 100);
});

ambient.on('error', function (err) {
  console.log(err)
});


