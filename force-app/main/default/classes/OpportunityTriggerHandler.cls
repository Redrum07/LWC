public with sharing class OpportunityTriggerHandler {
    private static Set<Id> processedOpportunityIds = new Set<Id>();
    public static void afterInsertHandler(List<Opportunity> opportunities) {
     Set<Id>  relatedAccountIds = new Set<Id>();

        for (Opportunity opp : opportunities) {
            if (opp.Amount != null && opp.AccountId != null && !processedOpportunityIds.contains(opp.id)) {
                relatedAccountIds.add(opp.AccountId);
                processedOpportunityIds.add(opp.Id);
            }
        }

        if(!relatedAccountIds.isEmpty()) {
        OpportunityTriggerHelper.updateRelatedAccountWithOpportunityAmount(relatedAccountIds);
        }
   
    }

  public static void afterUpdateHandler(List<Opportunity> opportunities,Map<id, Opportunity> oldOpportunities) {
    Set<Id>  relatedAccountIds = new Set<Id>();
    if (!oldOpportunities.isEmpty() && !opportunities.isEmpty()) {
      for (Opportunity opp : opportunities) {
        if (oldOpportunities.get(opp.Id).AccountId != opp.AccountId && opp.AccountId != null
         && !processedOpportunityIds.contains(opp.id)
        ) {

            relatedAccountIds.add(opp.AccountId);
            relatedAccountIds.add(oldOpportunities.get(opp.Id).AccountId);
            processedOpportunityIds.add(opp.Id);

        
        }
        else if(opp.Amount != oldOpportunities.get(opp.Id).Amount && opp.AccountId != null && !processedOpportunityIds.contains(opp.id)) {
            relatedAccountIds.add(opp.AccountId);
            processedOpportunityIds.add(opp.Id);

        }
       
        
        }
    }
    if(!relatedAccountIds.isEmpty()) {
      OpportunityTriggerHelper.updateRelatedAccountWithOpportunityAmount(relatedAccountIds);
    }
}

  public static void afterDeleteHandler(List<Opportunity> oldOps) {
   
    Set<Id>  relatedAccountIds = new Set<Id>();
   
    if(!oldOps.isEmpty() ) {
      for(Opportunity opp : oldOps) {
        if(opp.AccountId != null &&  !processedOpportunityIds.contains(opp.Id)
        ) {
          relatedAccountIds.add(opp.AccountId);
          processedOpportunityIds.add(opp.Id);
        }
      }
    }
    if(!relatedAccountIds.isEmpty()){
        OpportunityTriggerHelper.updateRelatedAccountWithOpportunityAmount(relatedAccountIds);

    }
  } 

  public static void afterUndeleteHandler(List<Opportunity> opportunities){

    afterInsertHandler(opportunities);
  }
}   