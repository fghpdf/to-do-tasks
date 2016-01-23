package service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import jdbc.JdbcConn;
import beans.TTBL;
import beans.Tasks;

public class Service {

	//数据库连接
	private Connection dbconnection;
	//数据库执行
	private Statement st;
	//数据库结果集
	private ResultSet rs;
	//统计的结果集
	private ResultSet rsTotal;
	//完成度的结果集
	private ResultSet rsAchieve;
	//sql语句
	private String sql;
	//每日任务sql语句
	private String ery_sql;
	//统计的sql语句
	private String sqlTotal;
	//完成度的sql语句
	private String sqlsetA;
	//完成度的sql语句
	private String sqlAchieve;
	//统计任务总数
	private double total;
	//统计完成任务数
	private double achieve;
	//存放数据
	private List list;
	private Tasks ta;
	private TTBL tb;
	
	//从数据库获取每日任务
	public List getTasks() throws ParseException{
		list = new ArrayList();
		dbconnection = JdbcConn.getConnection();
		try {
			st = (Statement)dbconnection.createStatement();
			Date date = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			String cdate = sdf.format(date);
			System.out.println(cdate);
			
			sql = " select t.tasksId tasksId,t.tasksName tasksName,t.tasksReleaseTime tasksRTime,t.achieve achieve " +
					"from tasks t " +
					"where tasksReleaseTime = \"" + cdate + " 00:50:00.0\"" +
					"group by t.tasksName;";
			rs = st.executeQuery(sql);
			while(rs.next()){
				ta = new Tasks();
				ta.setTasksId(rs.getInt("tasksId"));
				ta.setTasksName(rs.getString("tasksName"));
				ta.setTasksReleaseTime(rs.getString("tasksRTime"));
				ta.setAchieve(rs.getBoolean("achieve"));
				
				list.add(ta);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	//从数据库获取指定日期的任务
	public List getPointTasks(String pdate) throws ParseException{
		list = new ArrayList();
		dbconnection = JdbcConn.getConnection();
		try {
			st = (Statement)dbconnection.createStatement();
			System.out.println(pdate);
			
			sql = " select t.tasksId tasksId,t.tasksName tasksName,t.tasksReleaseTime tasksRTime,t.achieve achieve " +
					"from tasks t " +
					"where tasksReleaseTime = \"" + pdate + " 00:50:00.0\"" +
					"group by t.tasksName;";
			rs = st.executeQuery(sql);
			while(rs.next()){
				ta = new Tasks();
				ta.setTasksId(rs.getInt("tasksId"));
				ta.setTasksName(rs.getString("tasksName"));
				ta.setTasksReleaseTime(rs.getString("tasksRTime"));
				ta.setAchieve(rs.getBoolean("achieve"));
				
				list.add(ta);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	//从数据库获取任务计划表
	public List getTTBL() throws ParseException{
		list = new ArrayList();
		dbconnection = JdbcConn.getConnection();
		try {
			st = (Statement)dbconnection.createStatement();
			
			sql = " select * from ttbl;";
			rs = st.executeQuery(sql);
			while(rs.next()){
				tb = new TTBL();
				tb.setTtblId(rs.getInt("ttblId"));
				tb.setTtblName(rs.getString("ttblName"));
				tb.setTtblStartTime(rs.getString("ttblStartTime"));
				tb.setTtblEndTime(rs.getString("ttblEndTime"));
				
				list.add(tb);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	/*
	 *获取服务器当前时间，返回yyyy-MM-dd HH:mm:ss字符串形式
	 * */
	public String StlCurDate(){
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String stlcurdate = sdf.format(date);
		return stlcurdate;
	}
	
	//计算今日任务完成度
	public String CountTodayTasks() throws SQLException{
		st = (Statement)dbconnection.createStatement();
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String cdate = sdf.format(date);
		sqlTotal = "SELECT count(*) cou FROM monster.tasks t " +
				"where tasksReleaseTime = \""+cdate+" 00:50:00.0\";";
		sqlAchieve = "SELECT count(*) cou FROM monster.tasks t " +
				"where tasksReleaseTime = \""+cdate+" 00:50:00.0\""+
				"and achieve = 1;";
		rsTotal = st.executeQuery(sqlTotal);
		
		while(rsTotal.next()){
			this.setTotal(rsTotal.getDouble(1));
		}
		rsAchieve = st.executeQuery(sqlAchieve);
		while(rsAchieve.next()){
			this.setAchieve(rsAchieve.getDouble(1));
		}
		NumberFormat nt = NumberFormat.getPercentInstance();
		nt.setMinimumFractionDigits(2);
		System.out.println("当天"+nt.format(this.getAchieve()/this.getTotal()));
		return nt.format(this.getAchieve()/this.getTotal()*2);
	}
	
	//计算昨日任务完成度
	public String CountYerstdayTasks() throws SQLException{
		st = (Statement)dbconnection.createStatement();
		Date date = new Date();
		Date bdate = new Date();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DAY_OF_MONTH, -1);
		bdate = calendar.getTime();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String cdate = sdf.format(bdate);
		sqlTotal = "SELECT count(*) cou FROM monster.tasks t " +
				"where tasksReleaseTime = \""+cdate+" 00:50:00.0\";";
		sqlAchieve = "SELECT count(*) cou FROM monster.tasks t " +
				"where tasksReleaseTime = \""+cdate+" 00:50:00.0\""+
				"and achieve = 1;";
		rsTotal = st.executeQuery(sqlTotal);
		
		while(rsTotal.next()){
			this.setTotal(rsTotal.getDouble(1));
		}
		rsAchieve = st.executeQuery(sqlAchieve);
		while(rsAchieve.next()){
			this.setAchieve(rsAchieve.getDouble(1));
		}
		NumberFormat nt = NumberFormat.getPercentInstance();
		nt.setMinimumFractionDigits(2);
		System.out.println("前一天"+nt.format(this.getAchieve()/this.getTotal()));
		return nt.format(this.getAchieve()/this.getTotal()*2);
	}
	
	//计算前天任务完成度
	public String CountBeforeYesterdayTasks() throws SQLException{
		st = (Statement)dbconnection.createStatement();
		Date date = new Date();
		Date bdate = new Date();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DAY_OF_MONTH, -2);
		bdate = calendar.getTime();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String cdate = sdf.format(bdate);
		sqlTotal = "SELECT count(*) cou FROM monster.tasks t " +
				"where tasksReleaseTime = \""+cdate+" 00:50:00.0\";";
		sqlAchieve = "SELECT count(*) cou FROM monster.tasks t " +
				"where tasksReleaseTime = \""+cdate+" 00:50:00.0\""+
				"and achieve = true;";
		rsTotal = st.executeQuery(sqlTotal);
		
		while(rsTotal.next()){
			this.setTotal(rsTotal.getDouble(1));
		}
		rsAchieve = st.executeQuery(sqlAchieve);
		while(rsAchieve.next()){
			this.setAchieve(rsAchieve.getDouble(1));
		}
		NumberFormat nt = NumberFormat.getPercentInstance();
		nt.setMinimumFractionDigits(2);
		System.out.println("前天"+nt.format(this.getAchieve()/this.getTotal()));
		return nt.format(this.getAchieve()/this.getTotal()*2);
	}
	
	//每日任务数据写入数据库
	public void InsertTable() throws ParseException{
		
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String cdate = sdf.format(date);
		
		//sql语句
		dbconnection = JdbcConn.getConnection();
		try {
			st = (Statement)dbconnection.createStatement();
			//每天直接执行的sql语句
			ery_sql = "insert into tasks (tasksName) value(\"每日一练\"),(\"自闭症文献\")";
			System.out.println("每日一练，自闭症文献生成成功");
			st.execute(ery_sql);
			CreateTasks createtasks = new CreateTasks();
			//教育心理学sql
			createtasks.setStartdate("2015-05-17 00:00:00");
			createtasks.setFinishdate("2015-06-10 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"教育心理学、心理测量\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
				System.out.println("教育心理学、心理测量生成成功");
			}
			//知米sql
			createtasks.setStartdate("2015-05-17 00:00:00");
			createtasks.setFinishdate("2015-10-31 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"知米背单词\",\""+
				cdate+" 00:50:00.0\")";
				System.out.println(sql);
				st.execute(sql);
			}
			//人格、生理、社会、认知、方法、变态sql
			createtasks.setStartdate("2015-06-11 00:00:00");
			createtasks.setFinishdate("2015-06-30 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"人格、生理、社会等\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//真题翻译94-04sql
			createtasks.setStartdate("2015-05-11 00:00:00");
			createtasks.setFinishdate("2015-06-30 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"真题翻译94-04\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//英语翻译法sql
			createtasks.setStartdate("2015-06-06 00:00:00");
			createtasks.setFinishdate("2015-07-01 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"英语翻译法\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//心理学过关100题
			createtasks.setStartdate("2015-06-06 00:00:00");
			createtasks.setFinishdate("2015-07-11 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"心理学过关100题\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//专业整理之普心、统计
			createtasks.setStartdate("2015-07-01 00:00:00");
			createtasks.setFinishdate("2015-07-27 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"专业整理之普心、统计\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//专业整理之发心、实验
			createtasks.setStartdate("2015-07-28 00:00:00");
			createtasks.setFinishdate("2015-08-17 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"专业整理之发心、实验\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//专业整理之教心、测量
			createtasks.setStartdate("2015-08-18 00:00:00");
			createtasks.setFinishdate("2015-09-12 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"专业整理之教心、测量\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//专业整理之人格、生理、社会、认知、方法、变态
			createtasks.setStartdate("2015-09-13 00:00:00");
			createtasks.setFinishdate("2015-09-30 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"专业整理之人格、生理、社会、认知、方法、变态\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//英语真题2005
			createtasks.setStartdate("2015-07-02 00:00:00");
			createtasks.setFinishdate("2015-08-05 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"英语真题2005\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//心理学真题1994
			createtasks.setStartdate("2015-07-12 00:00:00");
			createtasks.setFinishdate("2015-10-31 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"心理学真题1994\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//英语词汇恋恋有词
			createtasks.setStartdate("2015-08-06 00:00:00");
			createtasks.setFinishdate("2015-09-30 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"英语词汇恋恋有词\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//专业回顾之普心、统计
			createtasks.setStartdate("2015-10-01 00:00:00");
			createtasks.setFinishdate("2015-10-17 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"专业回顾之普心、统计\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//专业回顾之发心、实验
			createtasks.setStartdate("2015-10-18 00:00:00");
			createtasks.setFinishdate("2015-10-30 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"专业回顾之发心、实验\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//专业回顾之教心、测量
			createtasks.setStartdate("2015-10-31 00:00:00");
			createtasks.setFinishdate("2015-11-15 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"专业回顾之教心、测量\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//英语词汇红宝书
			createtasks.setStartdate("2015-10-01 00:00:00");
			createtasks.setFinishdate("2015-10-31 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"英语词汇红宝书\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//红宝书配套练习题
			createtasks.setStartdate("2015-10-07 00:00:00");
			createtasks.setFinishdate("2015-10-31 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"红宝书配套练习题\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//英语作文
			createtasks.setStartdate("2015-08-06 00:00:00");
			createtasks.setFinishdate("2015-09-30 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"英语作文\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//英语真题2010
			createtasks.setStartdate("2015-11-28 00:00:00");
			createtasks.setFinishdate("2015-12-15 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"英语真题2010\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
			//心理学真题2010
			createtasks.setStartdate("2015-11-28 00:00:00");
			createtasks.setFinishdate("2015-12-15 23:59:59");
			if(createtasks.compareCurrentDate()){
				sql = "insert into tasks (tasksName,tasksReleaseTime) value(\"心理学真题2010\",\"" +
				cdate+" 00:50:00.0\")";
				st.execute(sql);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
			
	}
	


	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public void setAchieve(double achieve) {
		this.achieve = achieve;
	}

	public double getAchieve() {
		return achieve;
	}

	//完成任务，改变数据库中标志的值
	public void setAchieveTrue(String tasksId) throws SQLException {
		System.out.println("任务来了"+tasksId);
		dbconnection = JdbcConn.getConnection();
		st = (Statement)dbconnection.createStatement();
		sqlsetA = "update tasks set achieve = true where tasksId = " + tasksId + ";";
		System.out.println(sqlsetA);
		int n = st.executeUpdate(sqlsetA);
		System.out.println(n);
	}
}
