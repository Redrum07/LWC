public with sharing class CaseTriggerHandler {

    public static Set<Id> parentCaseIds;
    
    public static void afterInsertHandler(List<Case> cases) {

        parentCaseIds = new Set<Id>();
        
        for(Case caseRec : cases){
            if(caseRec.Resolution_Days__c != null){
                parentCaseIds.add(caseRec.ParentId);
            }
        }
        CaseTriggerHelper.updateTotalResDaysOnParentCases(parentCaseIds);
       
    }
    public static void afterUpdateHandler(List<Case> cases ,Map<Id,Case> oldCases) {
        parentCaseIds = new Set<Id>();
        
        for(Case c : cases){
            if(c.Resolution_Days__c != oldCases.get(c.Id).Resolution_Days__c ){
                parentCaseIds.add(c.ParentId);
            }
           

            if(c.ParentId != oldCases.get(c.Id).ParentId){
                
                parentCaseIds.add(c.ParentId);
                parentCaseIds.add(oldCases.get(c.Id).ParentId);
            }
        }

        
            CaseTriggerHelper.updateTotalResDaysOnParentCases(parentCaseIds);
        
    }
    public static void afterDeleteHandler(List<Case> cases) {

        parentCaseIds = new Set<Id>();
        
        for(Case caseRec : cases){
            if(caseRec.Status != 'Closed' && caseRec.Resolution_Days__c != null){
                parentCaseIds.add(caseRec.ParentId);
            }
        }
        CaseTriggerHelper.updateTotalResDaysOnParentCases(parentCaseIds);
        
    }
    public static void afterUndeleteHandler(List<Case> cases) {

        parentCaseIds = new Set<Id>();

        for(Case caseRec : cases){
            if(caseRec.Status != 'Closed' && caseRec.Resolution_Days__c != null){
                parentCaseIds.add(caseRec.ParentId);
            }
        }
        CaseTriggerHelper.updateTotalResDaysOnParentCases(parentCaseIds);
    }
}