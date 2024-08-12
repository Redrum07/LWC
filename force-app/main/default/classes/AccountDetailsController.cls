public with sharing class AccountDetailsController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getParentAccount(){
        
        return [Select Id,Name,Industry from Account where AnnualRevenue != NULL WITH USER_MODE];
    }
    
    @AuraEnabled
    public static String updateRecord(String recordId, String Sla){

        Account acc = new Account(Id = recordId);
        acc.SLA__c = Sla;
        update acc;
        return acc.Id;
    }
    

}