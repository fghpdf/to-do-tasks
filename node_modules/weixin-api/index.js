var sha1 = require('sha1'),
	events = require('events'),
	emitter = new events.EventEmitter(),
	xml2js = require('xml2js');
	
// 微信类
var Weixin = function() {
	this.data = '';
	this.msgType = 'text';
	this.fromUserName = '';
	this.toUserName = '';
	this.funcFlag = 0;
}

// 验证
Weixin.prototype.checkSignature = function(req) {    		
	
	// 获取校验参数
	this.signature = req.query.signature,
	this.timestamp = req.query.timestamp,
	this.nonce = req.query.nonce,
	this.echostr = req.query.echostr;
	
	// 按照字典排序
	var array = [this.token, this.timestamp, this.nonce];
	array.sort();
	
	// 连接
	var str = sha1(array.join(""));
	
	// 对比签名
	if(str == this.signature) {
		return true;
	} else {
		return false;
	}
}

// ------------------ 监听 ------------------------
// 监听文本消息
Weixin.prototype.textMsg = function(callback) {
	
	emitter.on("weixinTextMsg", callback);
	
	return this;
}

// 监听图片消息
Weixin.prototype.imageMsg = function(callback) {
	
	emitter.on("weixinImageMsg", callback);
	
	return this;
}

// 监听地理位置消息
Weixin.prototype.locationMsg = function(callback) {
	
	emitter.on("weixinLocationMsg", callback);
	
	return this;
}

// 监听链接消息
Weixin.prototype.urlMsg = function(callback) {
	
	emitter.on("weixinUrlMsg", callback);
	
	return this;
}

// 监听事件
Weixin.prototype.eventMsg = function(callback) {
	
	emitter.on("weixinEventMsg", callback);
	
	return this;
}

// ----------------- 消息处理 -----------------------
/*
 * 文本消息格式：
 * ToUserName	开发者微信号
 * FromUserName	 发送方帐号（一个OpenID）
 * CreateTime	 消息创建时间 （整型）
 * MsgType	 text
 * Content	 文本消息内容
 * MsgId	 消息id，64位整型
 */
Weixin.prototype.parseTextMsg = function() {
	var msg = {
		"toUserName" : this.data.ToUserName[0],
		"fromUserName" : this.data.FromUserName[0],
		"createTime" : this.data.CreateTime[0],
		"msgType" : this.data.MsgType[0],
		"content" : this.data.Content[0],
		"msgId" : this.data.MsgId[0],
	}
	
	emitter.emit("weixinTextMsg", msg);
	
	return this;
}

/*
 * 图片消息格式：
 * ToUserName	开发者微信号
 * FromUserName	 发送方帐号（一个OpenID）
 * CreateTime	 消息创建时间 （整型）
 * MsgType	 image
 * Content	 图片链接
 * MsgId	 消息id，64位整型
 */
Weixin.prototype.parseImageMsg = function() {
	var msg = {
		"toUserName" : this.data.ToUserName[0],
		"fromUserName" : this.data.FromUserName[0],
		"createTime" : this.data.CreateTime[0],
		"msgType" : this.data.MsgType[0],
		"picUrl" : this.data.PicUrl[0],
		"msgId" : this.data.MsgId[0],
	}
	
	emitter.emit("weixinImageMsg", msg);
	
	return this;
}

/*
 * 地理位置消息格式：
 * ToUserName	开发者微信号
 * FromUserName	 发送方帐号（一个OpenID）
 * CreateTime	 消息创建时间 （整型）
 * MsgType	 location
 * Location_X	 x
 * Location_Y    y
 * Scale　地图缩放大小
 * Label 位置信息
 * MsgId	 消息id，64位整型
 */
Weixin.prototype.parseLocationMsg = function(data) {
	var msg = {
		"toUserName" : this.data.ToUserName[0],
		"fromUserName" : this.data.FromUserName[0],
		"createTime" : this.data.CreateTime[0],
		"msgType" : this.data.MsgType[0],
		"locationX" : this.data.Location_X[0],
		"locationY" : this.data.Location_Y[0],
		"scale" : this.data.Scale[0],
		"label" : this.data.Label[0],
		"msgId" : this.data.MsgId[0],
	}
	
	emitter.emit("weixinLocationMsg", msg);
	
	return this;
}

/*
 * 链接消息格式：
 * ToUserName	开发者微信号
 * FromUserName	 发送方帐号（一个OpenID）
 * CreateTime	 消息创建时间 （整型）
 * MsgType	 link
 * Title	 消息标题
 * Description    消息描述
 * Url　消息链接
 * MsgId	 消息id，64位整型
 */
Weixin.prototype.parseLinkMsg = function() {
	var msg = {
		"toUserName" : this.data.ToUserName[0],
		"fromUserName" : this.data.FromUserName[0],
		"createTime" : this.data.CreateTime[0],
		"msgType" : this.data.MsgType[0],
		"title" : this.data.Title[0],
		"description" : this.data.Description[0],
		"url" : this.data.Url[0],
		"msgId" : this.data.MsgId[0],
	}
	
	emitter.emit("weixinUrlMsg", msg);
	
	return this;
}

/*
 * 事件消息格式：
 * ToUserName	开发者微信号
 * FromUserName	 发送方帐号（一个OpenID）
 * CreateTime	 消息创建时间 （整型）
 * MsgType	 event
 * Event 事件类型，subscribe(订阅)、unsubscribe(取消订阅)、CLICK(自定义菜单点击事件)
 * EventKey 事件KEY值，与自定义菜单接口中KEY值对应
 */
Weixin.prototype.parseEventMsg = function() {
	var eventKey = '';
	if (this.data.EventKey) {
		eventKey = this.data.EventKey[0];
	}
	
	var msg = {
		"toUserName" : this.data.ToUserName[0],
		"fromUserName" : this.data.FromUserName[0],
		"createTime" : this.data.CreateTime[0],
		"msgType" : this.data.MsgType[0],
		"event" : this.data.Event[0],
		"eventKey" : eventKey
	}
	
	emitter.emit("weixinEventMsg", msg);
	
	return this;
}

// --------------------- 消息返回 -------------------------
// 返回文字信息
Weixin.prototype.sendTextMsg = function(msg) {
	var time = Math.round(new Date().getTime() / 1000);
	
	var funcFlag = msg.funcFlag ? msg.funcFlag : this.funcFlag;
	
	var output = "" + 
	"<xml>" + 
		 "<ToUserName><![CDATA[" + msg.toUserName + "]]></ToUserName>" + 
		 "<FromUserName><![CDATA[" + msg.fromUserName + "]]></FromUserName>" + 
		 "<CreateTime>" + time + "</CreateTime>" + 
		 "<MsgType><![CDATA[" + msg.msgType + "]]></MsgType>" + 
		 "<Content><![CDATA[" + msg.content + "]]></Content>" + 
		 "<FuncFlag>" + funcFlag + "</FuncFlag>" + 
	"</xml>";
	
	this.res.type('xml'); 
	this.res.send(output);
	
	return this;
}

// 返回音乐信息
Weixin.prototype.sendMusicMsg = function(msg) {
	var time = Math.round(new Date().getTime() / 1000);
	
	var funcFlag = msg.funcFlag ? msg.funcFlag : this.funcFlag;
	
	var output = "" + 
	"<xml>" + 
		 "<ToUserName><![CDATA[" + msg.toUserName + "]]></ToUserName>" + 
		 "<FromUserName><![CDATA[" + msg.fromUserName + "]]></FromUserName>" + 
		 "<CreateTime>" + time + "</CreateTime>" + 
		 "<MsgType><![CDATA[" + msg.msgType + "]]></MsgType>" + 
	 	 "<Music>" + 
	 	 "<Title><![CDATA[" + msg.title + "]]></Title>" + 
	 	 "<Description><![CDATA[" + msg.description + "DESCRIPTION]]></Description>" + 
	 	 "<MusicUrl><![CDATA[" + msg.musicUrl + "]]></MusicUrl>" + 
	 	 "<HQMusicUrl><![CDATA[" + msg.HQMusicUrl + "]]></HQMusicUrl>" + 
	 	 "</Music>" + 
		 "<FuncFlag>" + funcFlag + "</FuncFlag>" + 
	"</xml>";
	
	this.res.type('xml'); 
	this.res.send(output);
	
	return this;
}

// 返回图文信息
Weixin.prototype.sendNewsMsg = function(msg) {
	var time = Math.round(new Date().getTime() / 1000);
	
	// 
	var articlesStr = "";	
	for (var i = 0; i < msg.articles.length; i++) 
	{
		articlesStr += "<item>" + 
							"<Title><![CDATA[" + msg.articles[i].title + "]]></Title>" + 
							"<Description><![CDATA[" + msg.articles[i].description + "]]></Description>" + 
							"<PicUrl><![CDATA[" + msg.articles[i].picUrl + "]]></PicUrl>" + 
							"<Url><![CDATA[" + msg.articles[i].url + "]]></Url>" + 
						"</item>";
	}
	
	var funcFlag = msg.funcFlag ? msg.funcFlag : this.funcFlag;
	var output = "" + 
	"<xml>" + 
		 "<ToUserName><![CDATA[" + msg.toUserName + "]]></ToUserName>" + 
		 "<FromUserName><![CDATA[" + msg.fromUserName + "]]></FromUserName>" + 
		 "<CreateTime>" + time + "</CreateTime>" + 
		 "<MsgType><![CDATA[" + msg.msgType + "]]></MsgType>" + 
		 "<ArticleCount>" + msg.articles.length + "</ArticleCount>" +
	 	 "<Articles>" + articlesStr + "</Articles>" +
		 "<FuncFlag>" + funcFlag + "</FuncFlag>" + 
	"</xml>";
	
	this.res.type('xml'); 
	this.res.send(output);
	
	return this;
}

// ------------ 主逻辑 -----------------
// 解析
Weixin.prototype.parse = function() {
	
	this.msgType = this.data.MsgType[0] ? this.data.MsgType[0] : "text";
		
	switch(this.msgType) {
		case 'text' : 
			this.parseTextMsg();
			break;
			
		case 'image' : 
			this.parseImageMsg();
			break;
			
		case 'location' : 
			this.parseLocationMsg();
			break;
			
		case 'link' : 
			this.parseLinkMsg();
			break;
			
		case 'event' : 
			this.parseEventMsg();
			break;
	}
}

// 发送信息
Weixin.prototype.sendMsg = function(msg) {
	switch(msg.msgType) {
		
		case 'text' : 
			this.sendTextMsg(msg);
			break;
			
		case 'music' : 
			this.sendMusicMsg(msg);
			break;
			
		case 'news' : 
			this.sendNewsMsg(msg);
			break;
	}
}

// Loop
Weixin.prototype.loop = function(req, res) {	
	// 保存res
	this.res = res;
	
	var self = this;
	
    // 获取XML内容
    var buf = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
		buf += chunk;
	});
	
	// 内容接收完毕
    req.on('end', function() {
		xml2js.parseString(buf, function(err, json) {
			if (err) {
                err.status = 400;
            } else {
                req.body = json;
            }
        });
		
		self.data = req.body.xml;
				
		self.parse();
    });
}

module.exports = new Weixin();
