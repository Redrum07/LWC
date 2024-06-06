public with sharing class customLookupController {

    @AuraEnabled(cacheable = true) 
    public static List<SObject> searchRecords(String objectApiName , String searchKey) {

        List<SObject> sObjectList = new List<SObject>();

        if(!String.isBlank(searchKey)){
            String key = '%' + searchKey + '%';
            String query = 'SELECT id, Name FROM ' + objectApiName + ' WHERE Name LIKE :key';
            sObjectList = Database.query(query,AccessLevel.USER_MODE);
        }
        
        return sObjectList;
        
    }
}