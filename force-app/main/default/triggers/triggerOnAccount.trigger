/**
 Whenever an after update trigger is executed on Account record , update a field named
 Last_After_Update_Execution_Time on Account with Current Time 
 */

trigger triggerOnAccount on Account (after update) {

    switch on Trigger.operationType{
        when AFTER_UPDATE{
        
            if(!AccountTriggerHandler.isAfterUpdateExecuted){
                AccountTriggerHandler.isAfterUpdateExecuted = true;
            AccountTriggerHandler.afterUpdateHandler(trigger.new);
        
            }    
        }
    }
}