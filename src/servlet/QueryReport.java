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

public class QueryReport extends HttpServlet{
	
	public QueryReport(){
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
		List list = null;
		Service service = new Service();
		String pdate = request.getParameter("pdate");
		System.out.println("pdate:"+pdate);
		try {
			list = service.getPointTasks(pdate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		request.getSession().setAttribute("TASKS", list);
		response.sendRedirect("query.jsp");
	}
}
