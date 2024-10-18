public with sharing class OpportunityTriggerHelper {
    public static  List<Account> accountsToBeUpdated ;
        
    public static void updateRelatedAccountWithOpportunityAmount(Set<Id> relatedAccountIds){
        
        accountsToBeUpdated = new List<Account>();
        
        AggregateResult[] ar = [
            SELECT AccountId, SUM(Amount) amount
            FROM Opportunity WHERE AccountId IN : relatedAccountIds Group By AccountId];
          
      
          if (!ar.isEmpty()) {
            for (AggregateResult res : ar) {
              Account a = new Account();
              Id accId = (Id) res.get('AccountId');
              Decimal amt = (Decimal) res.get('amount');
      
              a.Id = accId;
              a.Related_Opp_Amount_Rollup__c = amt;
      
              accountsToBeUpdated.add(a);
            }
            if (!accountsToBeUpdated.isEmpty()) {
              update accountsToBeUpdated;
            }
          }
    }
}