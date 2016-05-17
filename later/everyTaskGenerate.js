var later = require('later');
var task = require('../database/taskGenerate');

var basic = {h: [1], m: [0]};
var composite = [
    basic
];

var sched = {
    schedules:composite
};

later.date.localTime();


later.setInterval(function() {
    var now = new Date();
    console.log('目前时间:' + now.toLocaleString());
    task.generate(now);
}, sched);
