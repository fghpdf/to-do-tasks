package service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CreateTasks {
	
	//日期格式化
	private static final String pattern = "yyyy-MM-dd HH:mm:ss";
	//开始时间
	private String startdate;
	//结束时间
	private String finishdate;
	
	//判断当前是否生成任务
	public boolean compareCurrentDate() throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);
		Service service = new Service();
		Date cdate = sdf.parse(service.StlCurDate());
		Date start = sdf.parse(this.startdate);
		Date finish = sdf.parse(this.finishdate);
		if(cdate.getTime() > start.getTime() && cdate.getTime() < finish.getTime()){
			return true;
		}
		else{
			return false;
		}
	}
	
	//数据库写入任务数据
	public String sqlInsertTasks(String tasksName,String cdate){
		String sql;
		sql = "insert into tasks (tasksName,tasksReleaseTime) value(\""+tasksName+"\",\"" +
		cdate+" 00:50:00.0\")";
		return sql;
		
	}

	public String getStartdate() {
		return startdate;
	}

	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}

	public String getFinishdate() {
		return finishdate;
	}

	public void setFinishdate(String finishdate) {
		this.finishdate = finishdate;
	}
	
	
	

}
