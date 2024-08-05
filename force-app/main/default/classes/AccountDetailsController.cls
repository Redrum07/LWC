public with sharing class AccountDetailsController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getParentAccount(){
        
        return [Select Id,Name,Industry from Account where AnnualRevenue != NULL WITH USER_MODE];
    }
    
}