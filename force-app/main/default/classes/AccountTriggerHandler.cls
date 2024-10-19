public with sharing class AccountTriggerHandler {

    public static Boolean isAfterUpdateExecuted = false;

    public static void afterUpdateHandler(List<Account> accounts) {

        List<Account> accList = new List<Account>();
        Set<Id> accIds = new Set<Id>();
        for(Account acc : accounts){
            Account a = new Account(Id = acc.id,
                Last_After_Update_Execution_Time__c = Datetime.now());
            acclist.add(a);
            accIds.add(acc.Id);
        }
        if(!accList.isEmpty()){
            update accList;
        }
        if(!accIds.isEmpty()){
            updateRelatedOps(accIds);
        }
         
    }

    public static void updateRelatedOps(Set<Id> relatedAccountIds){
        List<Opportunity> oppList =new List<Opportunity>();
        List<Opportunity> updatedOpp = new List<Opportunity>();
        oppList = [SELECT Id ,StageName FROM Opportunity 
                    WHERE AccountId IN : relatedAccountIds 
                    AND CreatedDate <= N_DAYS_AGO:30  
                    AND StageName != 'Closed Won' ];

        if(!oppList.isEmpty()){
            
            for(Opportunity op: oppList){
                op.StageName = 'Closed Lost';
                updatedOpp.add(op);
            }

            if(!updatedOpp.isEmpty()){
                update updatedOpp;
            }
        }
    }
}