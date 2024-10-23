trigger triggerOnContact on Contact (before insert , before update ) {


    switch on Trigger.operationType {
        when BEFORE_INSERT {
            ContactTriggerHandler.beforeInsertHandler(Trigger.new);
        }
        when BEFORE_UPDATE {
            ContactTriggerHandler.beforeUpdateHandler(Trigger.new , Trigger.oldMap);
        }
        
    }
}