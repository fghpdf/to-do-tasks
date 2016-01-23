package jdbc;

import java.beans.Statement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class JdbcConn {
	//本地测试
	private static String url = "jdbc:mysql://localhost:3306/monster";
	private static String user = "root";
	private static String password = "940919";
	
	//SAE
	//private static String url = "jdbc:mysql://localhost:3307/monster";
	//private static String user = "root";
	//private static String password = "940919";
	
	//BAE
	//private static String url = "jdbc:mysql://sqld.duapp.com:4050/yWVrNvbibesclzFClXQP";
	//private static String user = "846d233f32204136914b707a17e55471";
	//private static String password = "3db63b0c51944d15bc1c3352229b45fb";
	
	public static Connection conn;
	public static PreparedStatement  ps;
	public static ResultSet rs;
	public static Statement st;
	
	public static Connection getConnection(){
		
		try {
			Class.forName("com.mysql.jdbc.Driver");
			
			conn = DriverManager.getConnection(url,user,password);
			System.out.println(conn);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return conn;
	}
}
