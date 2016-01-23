<%@ page language="java" import="java.util.*,beans.*,service.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>妖怪要查询</title>
    
    
    
    <meta content="MSHTML 6.00.2900.5945" name=GENERaTOR>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
    <link href="./css/mobilestyle.css" rel="stylesheet" type="text/css" media="all" />	
	
	

  </head>
  
  <body>
  <!--header-->
	<!--//header-->
	<!--content-->
		<!---->
		<!---->
		<!---->
		<!---->
		<!--clients-->
		<!---contant--->
	<div  id="contact" class="contact">
		<div class="clear"> </div>
		<div class="contact-us">
			<div class="container">
				<div class="us-contact">
					<h3>妖怪要查询</h3>
				</div>
				<form action="QueryReport" method="post" id="form_query">
					<div class="grid-contact-bootom">
						<div class="col-md-6 contact-bottom">
							<input type="text" name="pdate" value="请输入日期，例如：2015-06-05">
						</div>
						<div class="clear"> </div>
					</div>
					<input type="submit" value="现在就查！" >
				</form>
			</div>
	<table border="1" style="margin-top: 6%;margin-left: 24%;margin-bottom: 6%;">
	  <tr class="table-submit">
	    <th>任务名</th>
	    <th>发布时间</th>
	    <th>完成情况</th>
	  </tr>
<%
    List list = null;
    if(session.getAttribute("TASKS")!=null){
    
        list = (List)session.getAttribute("TASKS");
        
        if(list.size()>0){
        	Tasks ta;
        	for(int num=0;num<list.size();num++){
        	    ta = new Tasks();
        	    ta = (Tasks)list.get(num);
        		%>
       <tr class="table-submit">
         <th><%= ta.getTasksName() %></th>
         <th><%= ta.getTasksReleaseTime() %></th>
         <th><% if(ta.isAchieve()){out.print("已完成");}else{out.print("未完成");} %></th>
       </tr>
       <% }
       }
       }%>
	</table>
		</div>
		
	</div>
	<!--//content-->
	<!-- top-menu-links -->
	
	<!-- top-menu-links -->
	<!--footer-->
	<div class="footer">
	<div class="container">
		<h4 class="footer-class">妖怪要考研</h4>	
		 <p class="class-footer">&copy; 2015 Template by <a href="http://w3layouts.com/" target="_blank">quxx.sinaapp.com</a> </p>
		<div class="clear"> </div>
	</div>
	</div>
	<!--footer-->

 
  </body>
</html>
