public with sharing class TaskManagerController {
  @AuraEnabled(cacheable=true)
  public static List<Task_Manager__c> getIncompletedTasks() {
    return [
      SELECT id, Name, Task_Date__c
      FROM Task_Manager__c
      WHERE OwnerId = :userInfo.getUserId() AND isCompleted__c = FALSE
      WITH USER_MODE
      ORDER BY Task_Date__c
    ];
  }
  @AuraEnabled(cacheable=true)
  public static List<Task_Manager__c> getCompletedTasks() {
    return [
      SELECT id, Name, Task_Date__c
      FROM Task_Manager__c
      WHERE OwnerId = :userInfo.getUserId() AND isCompleted__c = TRUE
      WITH USER_MODE
      ORDER BY Completed_Date__c DESC
    ];
  }


}
