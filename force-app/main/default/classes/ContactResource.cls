
@RestResource(urlMapping='/ContactAPI/*')
global with sharing class ContactResource {
    
    @HTTPGet
    global static List<Contact> getContactIdAndNames(){
        
        RestRequest contactRequest = RestContext.request;

        String contactRequestURI = contactRequest.requestURI;

        Integer contactLimit = Integer.valueOf(
            contactRequestURI.substring(contactRequestURI.lastIndexOf('/')+1));

        List<Contact> contactList = [SELECT id, name FROM contact LIMIT :contactLimit];
        
        return contactList;
    }

    @HTTPPost
    global static Contact createNewContact(String firstName, String lastName , String birthDate, String leadSource){

        Contact con = new COntact();
        con.FirstName = firstName;
        con.LastName = lastName;
        con.LeadSource = leadSource;
        con.Birthdate = Date.parse(birthDate);
        
        insert con;
        return con;
    }
    @HTTPDelete
    global static Map<String,String> deleteContact(){

        Map<String,String> contactIdResponse = new Map<String,String>();
        
        RestRequest contactRequest = RestContext.request;
        
        String contactRequestURI = contactRequest.requestURI;

        Id contactId = Id.valueOf(contactRequestURI.substring(ContactRequestURI.lastIndexOf('/') + 1));

        Contact con = new Contact(Id = contactId);

        try{
                delete con;
                contactIdResponse.put('success', '1');
                contactIdResponse.put('message' , 'Record Deleted Successfully');

        }
        catch(DmlException ex){
            contactIdResponse.put('success' , '0');
            contactIdResponse.put('message' , ex.getMessage()); 
        }
        return contactIdResponse;
    }
}