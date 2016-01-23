<%@ page language="java" import="java.util.*,beans.*,service.*"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>妖怪要考研</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

		<link href="./css/bootstrap.css" rel="stylesheet" type="text/css"
			media="all" />
		<!--theme-style-->
		<link href="./css/style.css" rel="stylesheet" type="text/css"
			media="all" />
		<!--//theme-style-->
		<meta name="viewport"
			content="width=device-width, initial-scale=1, maximum-scale=1">
		<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
		<!--fonts-->
		<link
			href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800'
			rel='stylesheet' type='text/css'>
		<!--//fonts-->
		<script type="text/javascript" src="./js/move-top.js"></script>
		<script type="text/javascript" src="./js/easing.js"></script>
	</head>

	<body>
		<form action="ShowReport" method="post" id="form" name="fomrtasks">
			<script type="text/javascript">
      function setAchieve(id){
        var achieve = confirm("真的完成了吗？"+"\n"+"我可是监督的在哟！");
        var xmlhttp;
        var url = "ShowReport?id=" + id;
        if(window.XMLHttpRequest) {  
        //IE7, Firefox, Opera支持  
           req = new XMLHttpRequest();  
        }else if(window.ActiveXObject) {  
        //IE5,IE6支持  
          req = new ActiveXObject("Microsoft.XMLHTTP");  
        } 
        req.open("GET", url, true); 
        req.onreadystatechange = callback;  
        if(achieve){
          alert(url);
          req.send(null); 
        }
        else{
          alert("再接再厉！");
        }
      }
      function callback() {  
       if(req.readyState == 4 && req.status == 200) {  
         document.getElementById("form").submit();
      }  
    }  
    </script>
			<div class="header">
				<div class="container">
					<div class="header-matter">

						<div class="logo-head">
							<a href="#"><img class="img-responsive"
									src="./images/logo.png" alt="" />
							</a>
							<input type="submit" value="妖怪要考研">
						</div>
						<div class="head-grid">
							<%
								List list = null;
								if (session.getAttribute("TASKS") != null) {

									list = (List) session.getAttribute("TASKS");

									if (list.size() > 0) {
										Tasks ta;
										for (int num = 0; num < list.size() && num < 2; num++) {
											ta = new Tasks();
											ta = (Tasks) list.get(num);
							%>
							<div id="<%=ta.getTasksId()%>" class="men grid-men  scroll"
								onmousedown='setAchieve(this.id)' class="artical">
								<h6><%=ta.getTasksName()%></h6>
								<h6 id="wuyang">
									<%
										if (ta.isAchieve()) {
														out.print("已完成");
													} else {
														out.print("未完成");
													}
									%>
								</h6>
							</div>
							<%
								}
							%>

							<div class="clearfix">
							</div>
						</div>
						<div class="clearfix">
						</div>
					</div>
					<div class="grid-header">
						<%
							for (int num = 2; num < list.size() && num < 6; num++) {
										ta = new Tasks();
										ta = (Tasks) list.get(num);
						%>
						<div id="<%=ta.getTasksId()%>" class="grid-tv grid-men  scroll"
							onmousedown='setAchieve(this.id);' class="artical">
							<h6><%=ta.getTasksName()%></h6>
							<h6 id="wuyang">
								<%
									if (ta.isAchieve()) {
													out.print("已完成");
												} else {
													out.print("未完成");
												}
								%>
							</h6>
						</div>
						<%
							}
						%>
						<div class="clearfix">
						</div>
					</div>


					<div class="grid-head-contact">
						<%
							for (int num = 6; num < list.size() && num < 10; num++) {
										ta = new Tasks();
										ta = (Tasks) list.get(num);
						%>
						<div id="<%=ta.getTasksId()%>" class="grid-msg grid-men  scroll"
							onmousedown='setAchieve(this.id);' class="artical">
							<h6><%=ta.getTasksName()%></h6>
							<h6 id="wuyang">
								<%
									if (ta.isAchieve()) {
													out.print("已完成");
												} else {
													out.print("未完成");
												}
								%>
							</h6>
						</div>
						<%
							}
						%>
						<div class="clearfix">
						</div>
					</div>
					<div class="up">
						<a href="#about" class="scroll"><img class="up-grid"
								src="./images/up.png" alt="" />
						</a>
					</div>
				</div>
			</div>
			<%
				}
				}
			%>
			<!--script-->
			<script>
			$(document).ready(function(){
				$(".top-nav li a").click(function(){
					$(this).parent().addClass("active");
					$(this).parent().siblings().removeClass("active");
				});
			});
		</script>
			<!-- script-for sticky-nav -->
			<!-- /script-for sticky-nav -->
			<!--//header-->
			<!--content-->
			<div class="content">
				<div class="container">
					<div class="about" id="about">
						<h3>
							任务
							<span>完成</span>度
						</h3>
						<div class="about-grid">
							<div class="col-md-5 about-left">
								<%
									List ttblList = null;
									if (session.getAttribute("TTBL") != null) {

										ttblList = (List) session.getAttribute("TTBL");

										if (ttblList.size() > 0) {
											TTBL tb;
								%>
								<table border="1"
									style="margin-top: 6%; margin-bottom: 6%; margin-left: 0%;">
									<tr class="table-submit">
										<th>
											任务名
										</th>
										<th>
											开始时间
										</th>
										<th>
											结束时间
										</th>
									</tr>
									<tr class="table-submit">
										<th>
											每日一练
										</th>
										<th>
											每天
										</th>
										<th>
											每天
										</th>
									</tr>
									<tr class="table-submit">
										<th>
											自闭症文献
										</th>
										<th>
											每天
										</th>
										<th>
											每天
										</th>
									</tr>
									<%
										for (int num = 0; num < ttblList.size(); num++) {
													tb = new TTBL();
													tb = (TTBL) ttblList.get(num);
									%>
									<tr class="table-submit">
										<th><%=tb.getTtblName()%></th>
										<th><%=tb.getTtblStartTime()%></th>
										<th><%=tb.getTtblEndTime()%></th>
									</tr>
									<%
										}
											}
										}
									%>
								</table>
								<a href="MulitTasks.jsp" target="_blank" class="simsubmit">妖怪改任务</a>
								<a href="SubmitTasks.jsp" target="_blank" class="simsubmit">妖怪交任务</a>
							</div>
							<div class="col-md-5 about-right">
								<h5>
									近3日任务情况
								</h5>
								<%
									String todaypercent = "";
									String yestodaypercent = "";
									String beforeyestodaypercent = "";
									if (session.getAttribute("TODAYPERCENT") != null) {

										todaypercent = (String) session.getAttribute("TODAYPERCENT");
									}
									if (session.getAttribute("YTODAYPERCENT") != null) {

										yestodaypercent = (String) session
												.getAttribute("YTODAYPERCENT");

									}
									if (session.getAttribute("BYTODAYPERCENT") != null) {

										beforeyestodaypercent = (String) session
												.getAttribute("BYTODAYPERCENT");

									}
								%>

								<div class="green-about">
									<div class="about-green">
										<h6>
											前天
										</h6><%=beforeyestodaypercent%>
										<div class="content-green">
											<div id="beforeyestoday"
												style="width: <%=beforeyestodaypercent%>;">
											</div>
										</div>
									</div>
									<div class="about-green">
										<h6>
											昨天
										</h6><%=yestodaypercent%>
										<div class="content-green">
											<div id="yestoday" style="width: <%=yestodaypercent%>;">
											</div>
										</div>
									</div>
									<div class="about-green">
										<h6>
											今天
										</h6><%=todaypercent%>
										<div class="content-green">
											<div id="today" style="width: <%=todaypercent%>;">
											</div>
										</div>
									</div>
								</div>
								<a href="query.jsp" target="_blank" class="simsubmit">妖怪要查询</a>

								<div class="green-about">


								</div>
							</div>

							<div class="clearfix">
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	</body>
</html>
