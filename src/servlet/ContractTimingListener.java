package servlet;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class ContractTimingListener implements ServletContextListener {

	public void contextDestroyed(ServletContextEvent sce) {
		// TODO Auto-generated method stub

	}

	//监听接口
	public void contextInitialized(ServletContextEvent sce) {
		System.out.println("监视中");
		new TimeManger();

	}

}
