var express = require('express');
var router = express.Router();
var model = require('../database/model');
var url = require('url');
var task = require('../database/taskGenerate');

router.all('/', isLoggedIn);
router.all('/index', isLoggedIn);
router.all('/taskList', isLoggedIn);
router.all('/progress', isLoggedIn);
router.all('/completeTask', isLoggedIn);
router.all('/taskAdd', isLoggedIn);
router.all('/updateTask', isLoggedIn);
router.all('/deleteTask', isLoggedIn);

//获得首页页面
router.get('/', function(req, res) {
  res.redirect(303, '/user/index');
});

router.get('/index', function(req, res) {
  var now = new Date().Format('yyyy-MM-dd');
  var userName = req.session.passport.user.userName;
  var userEmail = req.session.passport.user.userEmail;
  model.Status.query({ where: { taskTime: now, userEmail: userEmail}}).query().then(function(model_query) {
    console.log(model_query);
    res.render('user/index', {
      title: '用户首页',
      userName: userName,
      taskList: model_query
    });
  }).catch(function(error) {
    res.render('error', {
      title: '出错啦',
      message: error.message,
      error: {}
    });
  });
});

//获取添加任务页面
router.get('/taskAdd', function(req, res) {
  var userName = req.session.passport.user.userName;
  res.render('user/taskAdd', {
    title: '添加任务',
    userName: userName
  });
});

//添加任务写入数据库
router.post('/taskAdd', function(req, res) {
  var userName = req.session.passport.user.userName;
  var userEmail = req.session.passport.user.userEmail;
  var taskName = req.body.taskName;
  var taskStartTime = new Date(req.body.taskStartTime);
  var taskEndTime = new Date(req.body.taskEndTime);
  var now = new Date();
  var taskLevel = req.body.taskLevel;
  new model.Task().save({
    taskName: taskName,
    taskStartTime: taskStartTime,
    taskEndTime: taskEndTime,
    taskLevel: parseInt(taskLevel),
    userEmail: userEmail
  }).then(function(model_save) {
    if(now >= taskStartTime && now <= taskEndTime) {
      var taskId = model_save.get('id');
      new model.Status({
        taskId: taskId,
        taskStatus: 0,
        taskTime: now,
        taskName: taskName,
        taskLevel: taskLevel,
        userEmail: userEmail
      }).save().then(function() {
        res.render('user/taskAdd', {
          title: '添加任务',
          userName: userName,
          message: '添加成功'
        });
      }).catch(function(error) {
        res.render('user/taskAdd', {
          title: '添加任务',
          userName: userName,
          message: '添加失败，原因：' + error
        });
      });
    }
  }).catch(function(error) {
    res.render('user/taskAdd', {
      title: '添加任务',
      userName: userName,
      message: '添加失败，原因：' + error
    });
  });
});

//获得任务列表页面
router.get('/taskList', function(req, res) {
  var userName = req.session.passport.user.userName;
  var userEmail = req.session.passport.user.userEmail;
  model.Task.query({ where: { userEmail: userEmail}}).query().then(function(model_query) {
    res.render('user/taskList', {
      title: '任务列表',
      userName: userName,
      taskList: model_query
    });
  }).catch(function(error) {
    res.render('error', {
      title: '出错啦',
      message: error.message,
      error: {}
    });
  });
});

//获取任务进度页面
router.get('/progress', function(req, res) {
  var userName = req.session.passport.user.userName;
  var userEmail = req.session.passport.user.userEmail;
  model.Status.query({ where: { userEmail: userEmail}}).query().then(function(model_query) {
    res.render('user/progress', {
      title: '任务完成进度',
      userName: userName,
      taskList: model_query
    });
  }).catch(function(error) {
    res.render('error', {
      title: '出错啦',
      message: error.message,
      error: {}
    });
  });
});

//获取修改任务页面
router.get('/updateTask', function(req, res) {
  var userName = req.session.passport.user.userName;
  var taskId =  url.parse(req.url, true).query.taskId;
  new model.Task({ id: taskId}).fetch().then(function(model_fetch) {
    if(model_fetch) {
      var taskName = model_fetch.get('taskName');
      var taskStartTime = model_fetch.get('taskStartTime');
      var taskEndTime = model_fetch.get('taskEndTime');
      var taskLevel = model_fetch.get('taskLevel');
      res.render('user/updateTask', {
        title: '修改任务',
        userName: userName,
        taskId: taskId,
        taskName: taskName,
        taskStartTime: taskStartTime,
        taskEndTime: taskEndTime,
        taskLevel: taskLevel
      });
    } else {
      res.render('error', {
        title: '出错啦',
        message: '没有此任务，刷新后重试'
      });
    }
  }).catch(function(error) {
    res.render('error', {
      title: '出错啦',
      message: error.message
    });
  })
});

router.post('/updateTask/:taskId', function(req, res) {
  var taskId = req.params.taskId;
  var userName = req.session.passport.user.userName;
  var userEmail = req.session.passport.user.userEmail;
  var taskName = req.body.taskName;
  var taskStartTime = new Date(req.body.taskStartTime);
  var taskEndTime = new Date(req.body.taskEndTime);
  var taskLevel = req.body.taskLevel;
  new model.Task({ id: taskId}).save({
    userEmail: userEmail,
    taskName: taskName,
    taskStartTime: taskStartTime,
    taskEndTime: taskEndTime,
    taskLevel: parseInt(taskLevel)
  }).then(function() {
    res.render('user/updateTask', {
      title: '修改任务',
      userName: userName,
      taskId: taskId,
      taskName: taskName,
      taskStartTime: taskStartTime,
      taskEndTime: taskEndTime,
      taskLevel: taskLevel,
      message: '修改成功，次日生效'
    });
  }).catch(function(error) {
    res.render('error', {
      title: '出错啦',
      message: error.message
    });
  });
});

//删除任务
router.get('/deleteTask', function(req, res) {
  var taskId =  url.parse(req.url, true).query.taskId;
  new model.Task({ id: taskId}).destroy().then(function() {
    res.redirect(303, '/user/taskList');
  }).catch(function(error) {
    res.render('error', {
      title: '出错啦',
      message: error.message
    });
  });
});

//完成任务接口
router.get('/completeTask', function(req, res) {
  var statusId =  url.parse(req.url, true).query.statusId;
  new model.Status({ id: statusId}).save({
    taskStatus: 1
  }).then(function() {
    res.redirect(303, '/user/');
  }).catch(function(error) {
    res.render('error', {
      title: '出错啦',
      message: error.message,
      error: {}
    });
  });
});


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

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
