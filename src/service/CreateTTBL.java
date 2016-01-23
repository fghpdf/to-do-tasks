package service;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import jdbc.JdbcConn;

public class CreateTTBL {
	
	//日期格式化
	private static final String pattern = "yyyy-MM-dd HH:mm:ss";
	//任务开始时间
	private String startdate;
	//任务结束时间
	private String finishdate;
	//任务表中任务名称
	private String ttblname;
	//数据库连接
	private Connection dbconnection;
	//数据库执行
	private Statement st;
	//sql语句
	private String sql;
	
	
	public String getStartdate() {
		return startdate + " 00:00:00";
	}
	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}
	public String getFinishdate() {
		return finishdate + " 23:59:59";
	}
	public void setFinishdate(String finishdate) {
		this.finishdate = finishdate;
	}
	public static String getPattern() {
		return pattern;
	}
	//任务表数据写入数据库
	public void sqlCreateTTBL() throws SQLException{
		dbconnection = JdbcConn.getConnection();
		st = (Statement)dbconnection.createStatement();
		sql = "insert into ttbl (ttblName,ttblStartTime,ttblEndTime) " +
				"value(\""+this.ttblname+"\",\""+this.startdate+"\",\""+this.finishdate+"\")";
		if(this.ttblname != null && this.startdate != null && this.finishdate != null){
			st.execute(sql);}
	}
	//任务表数据更新数据库
	public void sqlupdateTTBL() throws SQLException {
		dbconnection = JdbcConn.getConnection();
		st = (Statement) dbconnection.createStatement();
		sql = "update ttbl set ttblStartTime = \""+this.startdate+"\" ,ttblEndTime = \""+this.finishdate+
		"\" where ttblname = \""+this.ttblname+"\";";
		if (this.ttblname != null && this.startdate != null
				&& this.finishdate != null) {
			st.execute(sql);
		}
	}
	public String getTtblname() {
		return ttblname;
	}
	public void setTtblname(String ttblname) {
		this.ttblname = ttblname;
	}

}
