package servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.Service;

public class ShowReport extends HttpServlet{

	public ShowReport(){
		super();
	}
	
	public void init() throws ServletException{
		
	}
	
	protected void processRequest(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException, SQLException {
		response.setContentType("text/html;charset=UTF-8");  
		response.setContentType("text/html");  
        response.setHeader("Cache-Control", "no-store");  
        response.setHeader("Pragma", "no-cache");  
        response.setDateHeader("Expires", 0);
        System.out.println("收到！");
        String tasksIdStr = request.getParameter("id");
        Service service = new Service();
        service.setAchieveTrue(tasksIdStr);
        
	}
	
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException{
		try {
			processRequest(request, response);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException  {
		List list = null;
		List ttblList = null;
		String todaypercent = "";
		String yestodaypercent = "";
		String beforeyestodaypercent = "";
		Service service = new Service();
		try {
			list = service.getTasks();
			ttblList = service.getTTBL();
			todaypercent= service.CountTodayTasks();
			yestodaypercent = service.CountYerstdayTasks();
			beforeyestodaypercent = service.CountBeforeYesterdayTasks();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (SQLException e) {

			e.printStackTrace();
		}
		
		request.getSession().setAttribute("TASKS", list);
		request.getSession().setAttribute("TTBL", ttblList);
		request.getSession().setAttribute("TODAYPERCENT", todaypercent);
		request.getSession().setAttribute("YTODAYPERCENT", yestodaypercent);
		request.getSession().setAttribute("BYTODAYPERCENT", beforeyestodaypercent);
		
		response.sendRedirect("index.jsp");
	}
}
