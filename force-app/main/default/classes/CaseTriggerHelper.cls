public with sharing class CaseTriggerHelper {
    public static List<Case> parentCaseToUpdate ;
    public static void updateTotalResDaysOnParentCases(Set<Id> parentCaseIds) {
        
        if(!parentCaseIds.isEmpty()){
            parentCaseToUpdate = new List<Case>();
        
            AggregateResult[] caseAggr = [SELECT ParentId , SUM(Resolution_Days__c) res
                                        FROM Case WHERE ParentId IN :parentCaseIds
                                        GROUP BY ParentId];

            
    
            for(AggregateResult ar : caseAggr){
                Case c = new Case(Id =(Id)ar.get('ParentId') );
                c.Resolution_Days__c += (Decimal) ar.get('res');
                parentCaseToUpdate.add(c);
            }
            if(!parentCaseToUpdate.isEmpty()){
                update parentCaseToUpdate;
            }
        } 
    }
}