package servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.CreateTTBL;
import service.Service;

public class SubmitTasks extends HttpServlet{

	public SubmitTasks(){
		super();
	}
	
    public void init() throws ServletException{
		
	}
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException, SQLException {
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
    	response.setContentType("text/html;charset=UTF-8");  
		response.setContentType("text/html"); 
		request.setCharacterEncoding("UTF-8");
		String ttblName = request.getParameter("ttblname");
		String ttblStartTime = request.getParameter("ttblstarttime");
		String ttblEndTime = request.getParameter("ttblendtime");
		
		
		CreateTTBL create = new CreateTTBL();
		create.setTtblname(ttblName);
		create.setStartdate(ttblStartTime);
		create.setFinishdate(ttblEndTime);
		try {
			create.sqlCreateTTBL();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		response.sendRedirect("SubmitTasks.jsp");
	}


}
