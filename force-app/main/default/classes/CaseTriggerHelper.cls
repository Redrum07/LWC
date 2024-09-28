public with sharing class CaseTriggerHelper {
    public static List<Case> parentCaseToUpdate ;
    public static void updateTotalResDaysOnParentCases(Set<Id> parentCaseIds) {
        parentCaseToUpdate = new List<Case>();
        if(!parentCaseIds.isEmpty()){
            parentCaseToUpdate = new List<Case>();
        
            AggregateResult[] caseAggr = [SELECT ParentId , SUM(Resolution_Days__c)res
                                        FROM Case WHERE ParentId IN :parentCaseIds
                                        GROUP BY ParentId];

            
    
            for(AggregateResult ar : caseAggr){
                Id parentId = (Id) ar.get('ParentId');
                Decimal res = (Decimal) ar.get('res');
                System.debug(parentId + ' ' + res);
            
                parentCaseToUpdate.add(new Case(Id = parentId, Resolution_Days__c = res));
            }
            if(!parentCaseToUpdate.isEmpty()){
                update parentCaseToUpdate;
            }
        } 
    }
}