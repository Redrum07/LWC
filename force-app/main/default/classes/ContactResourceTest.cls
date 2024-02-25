@isTest
public with sharing class ContactResourceTest {
    
    @TestSetup
    static void makeData(){
        Contact contactTest = new Contact(FirstName='Shivam', LastName = 'Bindroo');
        insert contactTest;
    }

    @isTest
     static void testGetContactIdAndNames(){
        Test.startTest();
        RestRequest contactRequest = new RestRequest();
        contactRequest.requestURI = 'https://d5g00000a2qbpeaj-dev-ed.lightning.force.com/services/apexrest/ContactAPI/1';
        contactRequest.httpMethod = 'GET';
        RestContext.request = contactRequest;

        List<Contact> contactsReturned = ContactResource.getContactIdAndNames();
        
        System.assert(contactsReturned != null);
        System.assert(contactsReturned.size() == 1);
        System.assertEquals('Shivam Bindroo', contactsReturned[0].Name);
        Test.stopTest();
    }

    @isTest
    static void testCreateNewContact(){
        Test.startTest();
    
        Contact contactCreated = ContactResource.createNewContact('Shivam', 'Bindroo', '07/10/1997', 'Web');

        System.assert(contactCreated != null);
        System.assert(contactCreated.Id != null);

        Contact queryContact = [Select LeadSource From Contact WHERE Id =: contactCreated.Id];

        System.assertEquals(queryContact.LeadSource, contactCreated.LeadSource);
        Test.stopTest();
    }


    @isTest
    static void testUpdateContact(){

        Test.startTest();
        Contact conToUpdate = [Select id from contact where LastName = 'Bindroo' Limit 1];

        Contact contact = new Contact();
        contact.LastName = 'Update';
        contact.LeadSource = 'Web';
        RestRequest  conRequest = new RestRequest();
        conRequest.requestURI = 'https://d5g00000a2qbpeaj-dev-ed.lightning.force.com//services/apexrest/ContactAPI/'+ conToUpdate.Id;
        conRequest.httpMethod = 'PATCH';
        conRequest.requestBody = Blob.valueOf(JSON.serialize(contact));
        
        RestContext.request = conRequest;

        Contact conReturned = ContactResource.updateContact();

        System.assert(conReturned.Id != null);
        Contact QueryCon = [Select LeadSource, LastName from Contact where Id =:conToUpdate.Id];

        System.assert(QueryCon.Id != null);
        System.assertEquals(QueryCon.LeadSource, conReturned.LeadSource);
        System.assertEquals(QueryCon.LastName, conReturned.LastName);
        Test.stopTest();

    
    }

}