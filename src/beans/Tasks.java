package beans;

public class Tasks {
	//任务ID
	private int tasksId;
	//任务名称
	private String tasksName;
	//任务发布时间
	private String tasksReleaseTime;
	//任务是否完成
	private boolean achieve;
	public int getTasksId() {
		return tasksId;
	}
	public void setTasksId(int tasksId) {
		this.tasksId = tasksId;
	}
	public String getTasksName() {
		return tasksName;
	}
	public void setTasksName(String tasksName) {
		this.tasksName = tasksName;
	}
	public String getTasksReleaseTime() {
		return tasksReleaseTime;
	}
	public void setTasksReleaseTime(String tasksReleaseTime) {
		this.tasksReleaseTime = tasksReleaseTime;
	}
	public boolean isAchieve() {
		return achieve;
	}
	public void setAchieve(boolean achieve) {
		this.achieve = achieve;
	}
}
