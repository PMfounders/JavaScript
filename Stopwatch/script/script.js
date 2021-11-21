var startBtn = document.getElementById('start').onclick = start;
var stopBtn = document.getElementById('stop').onclick = stop;
var resetBtn = document.getElementById('reset').onclick = reset;

const stopwatch = document.getElementById('stopwatch');

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function start() {
    if (stoptime == true) {
        stoptime = false;
        timer();
    }else  if (stoptime == false) {
        stoptime = true;
    }
}

function timer() {
    if (stoptime == false) {
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);

        sec = sec + 1;

        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (min == 60) {
            hr = hr + 1;
            min = 0;
            sec = 0;
        }

        if (sec < 10) {
            sec = '0' + sec;
        }
        if (min < 10) {
            min = '0' + min;
        }
        if (hr < 10) {
            hr = '0' + hr;
        }

        stopwatch.innerHTML = hr + ':' + min + ':' + sec;

        setTimeout("timer()", 1000);
    }
}
function stop() {
    if (stoptime == false) {
        stoptime = true;
    }
}

function reset() {
    stopwatch.innerHTML = "00:00:00";
    stoptime = true;
    hr = 0;
    sec = 0;
    min = 0;
}