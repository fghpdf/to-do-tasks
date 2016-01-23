package servlet;

import java.util.TimerTask;

import service.Service;

import com.sun.istack.internal.logging.Logger;

public class ContractTimingTasks extends TimerTask{
	
	//日志
	private static Logger log = Logger.getLogger(ContractTimingTasks.class);
	
	//执行部分
	public void run(){
		Service service = new Service();
		try{
			service.InsertTable();
			log.info("每日任务发部成功");
			System.out.println("每日任务发部成功");
		}catch (Exception e){
			log.info("每日任务发布出现异常");
			System.out.println("每日任务发布出现异常");
		}
	}
}
