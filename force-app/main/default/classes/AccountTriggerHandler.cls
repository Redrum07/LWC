public with sharing class AccountTriggerHandler {

    public static Boolean isAfterUpdateExecuted = false;

    public static void afterUpdateHandler(List<Account> accounts) {

        List<Account> accList = new List<Account>();

        for(Account acc : accounts){
            Account a = new Account(Id = acc.id,
                Last_After_Update_Execution_Time__c = Datetime.now());
            acclist.add(a);
        }
        if(!accList.isEmpty()){
            update accList;
        }
         
    }
}