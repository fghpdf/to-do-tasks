package beans;

public class TTBL {

	//任务表ID
	private int ttblId;
	
	//任务名称
	private String ttblName;
	
	//任务开始时间
	private String ttblStartTime;
	
	//任务结束时间
	private String ttblEndTime;
	
	//任务修改次数
	private int ttblTimes;

	public int getTtblId() {
		return ttblId;
	}

	public void setTtblId(int ttblId) {
		this.ttblId = ttblId;
	}

	public String getTtblName() {
		return ttblName;
	}

	public void setTtblName(String ttblName) {
		this.ttblName = ttblName;
	}

	public String getTtblStartTime() {
		return ttblStartTime;
	}

	public void setTtblStartTime(String ttblStartTime) {
		this.ttblStartTime = ttblStartTime;
	}

	public String getTtblEndTime() {
		return ttblEndTime;
	}

	public void setTtblEndTime(String ttblEndTime) {
		this.ttblEndTime = ttblEndTime;
	}

	public int getTtblTimes() {
		return ttblTimes;
	}

	public void setTtblTimes(int ttblTimes) {
		this.ttblTimes = ttblTimes;
	}
	
	
}
