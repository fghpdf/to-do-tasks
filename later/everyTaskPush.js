var later = require('later');
var email = require('../push/email');
var model = require('../database/model');

var basic = {h: [9], m: [0]};
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
    model.User.query({}).query().then(function(model_query) {
        for(var num = 0; num < model_query.length; num++) {
            var userEmail = model_query[num].userEmail;
            sendEmail(userEmail);
        }
    });
}, sched);

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

function sendEmail(userEmail) {
    var now = new Date();
    model.Status.query({ where: {
        userEmail: userEmail,
        taskTime: now.Format('yyyy-MM-dd'),
        taskStatus: 0
    }}).count().then(function(count) {
        if(count) {
            console.log(userEmail);
            email.send(userEmail, '每日任务提醒', '', '<h1>您还有' + count + '个任务没完成，快来http://www.fghpdf.com:3000看看吧</h1>');
        }
    });
}

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/login');
    }
}


