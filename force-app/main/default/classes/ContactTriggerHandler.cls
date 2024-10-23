public with sharing class ContactTriggerHandler {
    
    public static void beforeInsertHandler(List<Contact> newContacts){

        Map<String,Contact> phoneByContact = new Map<String,Contact>();
        Map<String,Contact> emailByContact = new Map<String,Contact>();
        for(Contact con : newContacts){
          
                phoneByContact.put(con.Phone,con);
          
                emailByContact.put(con.email,con);
            
        }

        if(!phoneByContact.isEmpty() || !emailByContact.isEmpty()){
            ContactTriggerHelper.commonMethod(phoneByContact, emailByContact);
        }
    }
    public static void beforeUpdateHandler(List<Contact> newContact , Map<Id,Contact> oldContacts){

        Map<String,Contact> phoneByContact = new Map<String,Contact>();
        Map<String,Contact> emailByContact = new Map<String,Contact>();

            for(Contact con : newContact){
                if(con.Phone != oldContacts.get(con.Id).Phone ){
                       phoneByContact.put(con.Phone,con);

                }
                
                if(con.Email != oldContacts.get(con.Id).Email){
                       emailByContact.put(con.email,con);

                    }
                }
            
            if(!phoneByContact.isEmpty() || !emailByContact.isEmpty()){
                ContactTriggerHelper.commonMethod(phoneByContact, emailByContact);
            }
            
        }
}