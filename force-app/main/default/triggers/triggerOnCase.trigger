/*
Our company's Salesforce support system manages customer support cases.Each case has multiple related
child cases. The company wants to implement a feature that automically calculates and updates the 
total resolution days on the parent case from it related child cases. The changes made to the child
cases should be reflected in the parent case.

*/

trigger triggerOnCase on Case (after insert , after update , after delete , after undelete ) {


    switch on Trigger.operationType{
        when AFTER_INSERT{
            CaseTriggerHandler.afterInsertHandler(Trigger.new);
        }
        when AFTER_UPDATE{
            CaseTriggerHandler.afterUpdateHandler(Trigger.new , Trigger.oldMap);
        }
        when AFTER_DELETE{
            CaseTriggerHandler.afterDeleteHandler(Trigger.old);
        }
        when AFTER_UNDELETE{
            CaseTriggerHandler.afterUndeleteHandler(Trigger.new);
        }
    }
}