var model = require('./model');
var async = require('async');


function generate(now) {
    model.Task.query(function(qb) {
        console.log(now.toLocaleString());
        var nowPromise = new Date();
        nowPromise.setDate(now.getDate() - 1);
        qb.where('taskStartTime', '<=', now.Format('yyyy-MM-dd')).andWhere('taskEndTime', '>=', nowPromise.Format('yyyy-MM-dd'));
    }).query().then(function(model_query) {
        async.eachSeries(model_query, function(item, callback_async) {
            var savePromise = new model.Status({ taskTime: now.toLocaleDateString(), taskId: item.id}).fetch();
            savePromise.then(function(model_fetch) {
                if(!model_fetch) {
                    new model.Status({
                        taskId: item.id,
                        taskStatus: 0,
                        taskTime: now,
                        taskName: item.taskName,
                        taskLevel: item.taskLevel,
                        userEmail: item.userEmail
                    }).save().then(function() {
                        console.log(item.taskName + '生成成功');
                        callback_async(null, item);
                    }).catch(function(error) {
                        callback_async(error, item);
                    });
                } else {
                    callback_async(null, item);
                }
            });
        }, function(error) {
            if(error) {
                console.log(error);
            } else {
                console.log('success');
            }
        });
    }).catch(function(error) {
        console.log(error);
    });
}

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

module.exports = {
    generate : generate
};
