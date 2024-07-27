public with sharing class ContactBrowserController {
    
    @AuraEnabled(cacheable = true)
    public static List<Contact> getContacts(String accountId , String industry) {

        String query = 'Select id, Name , Email, Phone , Title, PhotoUrl from Contact';
        
        
        if(String.isNotBlank(accountId) && String.isNotBlank(industry)){
            query += ' Where AccountId = :accountId AND Industry = :industry';
        }
        else if (String.isNotBlank(accountId)) {
            query += ' Where AccountId = :accountId';
        }
        else if (String.isNotBlank(industry)){
            query += ' Where Contact.Account.Industry = :industry';
        }


        query += ' With USER_MODE ';
        query += 'Order By Name';

        List<Contact> con = Database.query(query);

        System.debug('query -> ' + query);
        System.debug('con _>'+ con);
        return con;
        
    }
}