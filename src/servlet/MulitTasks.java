package servlet;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.CreateTTBL;

public class MulitTasks extends HttpServlet{
	
	public MulitTasks(){
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
    
    //接受并处理
    public void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException  {
    	response.setContentType("text/html;charset=UTF-8");  
		response.setContentType("text/html"); 
		request.setCharacterEncoding("UTF-8");
		String ttblName = request.getParameter("ttblname");
		String ttblStartTime = request.getParameter("ttblstarttime");
		String ttblEndTime = request.getParameter("ttblendtime");
		
		System.out.println("hkajhf:"+ttblName);
		CreateTTBL create = new CreateTTBL();
		create.setTtblname(ttblName);
		create.setStartdate(ttblStartTime);
		create.setFinishdate(ttblEndTime);
		try {
			create.sqlupdateTTBL();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		response.sendRedirect("MulitTasks.jsp");
	}

}
