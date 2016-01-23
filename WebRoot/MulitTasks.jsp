<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
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

		<link href="./css/font-awesome.min.css" rel="stylesheet"
			type="text/css">
		<link href="css/bootstrap.min.css" rel="stylesheet" type="text/css">
		<link href="css/bootstrap-theme.min.css" rel="stylesheet"
			type="text/css">
		<link href="css/templatemo_style.css" rel="stylesheet" type="text/css">

	</head>

	<body>
		<div class="container">
			<div class="col-md-12">
				<h1 class="margin-bottom-15">
					更改任务
				</h1>
				<form
					class="form-horizontal templatemo-container templatemo-login-form-1 margin-bottom-30"
					role="form" action="MulitTasks" method="post">
					<div class="form-group">
						<div class="col-xs-12">
							<div class="control-wrapper">
								<label for="ttblname" class="control-label fa-label">
									<i class="fa fa-user fa-medium"></i>
								</label>
								<input type="text" class="form-control" name="ttblname"
									id="ttblname" placeholder="任务名">
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-md-12">
							<div class="control-wrapper">
								<label for="ttblstarttime" class="control-label fa-label">
									<i class="fa fa-lock fa-medium"></i>
								</label>
								<input type="text" class="form-control" name="ttblstarttime"
									id="ttblstarttime" placeholder="任务开始时间">
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-xs-12">
							<div class="control-wrapper">
								<label for="ttblendtime" class="control-label fa-label">
									<i class="fa fa-user fa-medium"></i>
								</label>
								<input type="text" class="form-control" name="ttblendtime"
									id="ttblendtime" placeholder="任务结束时间">
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="col-md-12">
							<div class="control-wrapper">
								<input type="submit" value="好了！提交" class="btn btn-info">
								<a href="index.jsp" class="text-right pull-right">返回首页</a>
							</div>
						</div>
					</div>
					<hr>
				</form>

			</div>
		</div>

	</body>
</html>
