public with sharing class ContactTriggerHelper {
    public static void commonMethod(Map<String,Contact> phoneByContact , Map<String,Contact> emailByContact){
        List<Contact> existingContacts = [SELECT id FROM CONTACT WHERE 
                                        Phone IN : phoneByContact.keySet() OR
                                        Email IN : emailByContact.keySet()
                                        ];

        if(!existingContacts.isEmpty()){
            for(Contact con : existingContacts){
                if(phoneByContact.containsKey(con.Phone)){
                    con.addError('A contact with this Phone already exists');
                }
                else if(emailByContact.containsKey(con.Email)){
                    con.addError('A contact with this Email already exists');
                }
                else{
                    con.addError('A contact with this Email and Phone already exists');
                }
            }
        }
    }

	
}