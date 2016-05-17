var express = require('express');
var router = express.Router();
var WechatAPI  = require('wechat-api');
var model = require('../database/model');
var url = require('url');
var api = new WechatAPI('wx6113c0a3df125c8d', '6c0798c25cd48efb1bb84c079d79c6d8');
var weixin = require('weixin-api');


//接入验证
router.get('/', function(req, res) {
    //签名成功
    if (weixin.checkSignature(req)) {
        res.send(200, req.query.echostr);
    } else {
        res.send(200, 'fail');
    }
});

//接收消息
router.post('/', function(req, res) {
    var signature = url.parse(req.url, true).query.signature;
    var timestamp = url.parse(req.url, true).query.timestamp;
    var nonce = url.parse(req.url, true).query.nonce;

    console.log('signature=', signature);
    console.log('timestamp=', timestamp);
    console.log('nonce=', nonce);

    //loop
    weixin.loop(req, res);
});

// config
weixin.token = 'fghpdf';

//监听文本信息
weixin.textMsg(function(msg) {
    console.log('接收到消息啦');
    console.log(JSON.stringify(msg));

    switch (msg.content) {
        case '查询任务':
            queryTasks(msg);
            break;

        case '帮助':
            var resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "text",
                content : "1.网页版http://task.fghpdf.com\n" +
                          "2.输入 查询任务 可以获得已经添加的任务信息\n" +
                          "3.输入 未完成 可以获得今天未完成的任务数量\n" +
                          "4.更多功能敬请期待\n",
                funcFlag : 0
            };
            weixin.sendMsg(resMsg);
            break;

        case '未完成':
            queryUncomplete(msg);
            break;

        default:
            var resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "text",
                content : "1.网页版http://task.fghpdf.com\n" +
                "2.输入 查询任务 可以获得已经添加的任务信息\n" +
                "3.输入 未完成 可以获得今天未完成的任务数量\n" +
                "4.更多功能敬请期待\n",
                funcFlag : 0
            };
            weixin.sendMsg(resMsg);
            break;
    }
});

//通过weixinId查询任务
function queryTasks(msg) {
    var weixinId = msg.fromUserName;
    var resMsg = {};
    new model.User({ weixinId: weixinId}).fetch().then(function(model_fetch) {
        if(model_fetch) {
            model.Task.query({ where: {
                userEmail: model_fetch.get('userEmail')
            }}).query().then(function(model_query) {
                var content = "名称     开始时间      结束时间\n";
                for(var num = 0; num < model_query.length; num++) {
                    content += model_query[num].taskName +
                        model_query[num].taskStartTime.Format('yyyy-MM-dd') +
                        model_query[num].taskEndTime.Format('yyyy-MM-dd') +
                        "\n";
                }
                resMsg = {
                    fromUserName : msg.toUserName,
                    toUserName : msg.fromUserName,
                    msgType : "text",
                    content : content,
                    funcFlag : 0
                };
                weixin.sendMsg(resMsg);
            }).catch(function(error) {
                console.log(error);
                resMsg = {
                    fromUserName : msg.toUserName,
                    toUserName : msg.fromUserName,
                    msgType : "text",
                    content : "服务器爆炸啦",
                    funcFlag : 0
                };
                weixin.sendMsg(resMsg);
            });
        } else {
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "text",
                content : "您尚未绑定账号",
                funcFlag : 0
            };
            weixin.sendMsg(resMsg);
        }
    }).catch(function(error) {
        console.log(error);
        resMsg = {
            fromUserName : msg.toUserName,
            toUserName : msg.fromUserName,
            msgType : "text",
            content : "服务器爆炸啦",
            funcFlag : 0
        };
        weixin.sendMsg(resMsg);
    });
}

//通过weixinId查询未完成数量
function queryUncomplete(msg) {
    var weixinId = msg.fromUserName;
    var resMsg = {};
    var now  = new Date();
    new model.User({ weixinId: weixinId}).fetch().then(function(model_fetch) {
        if(model_fetch) {
            model.Status.query({ where: {
                userEmail: model_fetch.get('userEmail'),
                taskTime: now.Format('yyyy-MM-dd'),
                taskStatus: 0
            }}).count().then(function(count) {
                resMsg = {
                    fromUserName : msg.toUserName,
                    toUserName : msg.fromUserName,
                    msgType : "text",
                    content : "您还有" + count + "个任务没有完成\n" +
                              "请进入网页版查看\n",
                    funcFlag : 0
                };
                weixin.sendMsg(resMsg);
            });
        } else {
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "text",
                content : "您尚未绑定账号",
                funcFlag : 0
            };
            weixin.sendMsg(resMsg);
        }
    }).catch(function(error) {
        console.log(error);
        resMsg = {
            fromUserName : msg.toUserName,
            toUserName : msg.fromUserName,
            msgType : "text",
            content : "服务器爆炸啦",
            funcFlag : 0
        };
        weixin.sendMsg(resMsg);
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

module.exports = router;

