<%@ page language="java" import="java.util.*,beans.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>妖怪每日任务</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
  
  <body>
    <form action="ShowReport" method="post">
      <input type="submit" value="测试">
    </form>
    <table>
    
    <%
    List list = null;
    if(session.getAttribute("TASKS")!=null){
    
        list = (List)session.getAttribute("TASKS");
        
        if(list.size()>0){
        	Tasks ta;
        	for(int i=0;i<list.size();i++){
        		ta = new Tasks();
        		ta = (Tasks)list.get(i);
        		%>
        		<tr>
        		  <td>haha</td>
        		  <td><%= ta.getTasksName() %></td>
        		  <td><%= ta.getTasksReleaseTime() %></td>
        		</tr>
        		<%
        	}
        }
    }
     %>
     </table>
  </body>
</html>
