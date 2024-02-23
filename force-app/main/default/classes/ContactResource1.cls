
@RestResource(urlMapping = '/ContactAPI1/*')
global with sharing class ContactResource1 {
    
    @HTTPGet
    global static List<Contact> getContactIdNamesAndLeadSource(){

        RestRequest contactRequest = RestContext.request;
        Map<String,String> contactRequestParams = contactRequest.params;

        Integer contactLimit = Integer.valueOf(contactRequestParams.get('limit'));
        String leadSource = contactRequestParams.get('leadSource');

        List<contact> contactList = [SELECT id,Name FROM Contact WHERE leadSource =:leadSource LIMIT:contactLimit];
        return contactList;
    }


    @HTTPPost
    global static Contact createNewContact(){

        RestRequest contactRequest = RestContext.request;
        String requestBody = contactRequest.requestBody.toString();

        Contact contact = (Contact) JSON.deserialize(requestBody, Contact.class);
        insert contact;

        return contact;
    }
}