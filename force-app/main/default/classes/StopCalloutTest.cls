
@isTest
public with sharing class StopCalloutTest {
    
    public static FINAL String RESPONSE_CODE = '200';
    public static FINAL String RESPONSE_HEADER_KEY = 'Content-Type';
    public static FINAL String RESPONSE_HEADER_VALUE = 'application/json';
    public static FINAL String RESPONSE_BODY = '{"author": "Rahul Malhotra","blogs": [{"id": "1","title": "Salesforce Integration Tutorial Part1 - Introduction and Setting up Workbench","url": "https://www.sfdcstop.com/2019/11/salesforce-integration-tutorial-part-1.html"},{"id": "2","title": "Salesforce Integration Tutorial Part 2 - Exploring GET Method","url": "https://www.sfdcstop.com/2019/11/salesforce-integration-tutorial-part-2.html"}]}';

    @isTest 
    static void testGetBlogs(){

        Test.startTest();

        Test.setMock(HttpCalloutMock.class, new StopMock());
        HttpResponse response = StopCallout.getBlogs();

        System.assertEquals(RESPONSE_CODE, response.getStatusCode());
        Test.stopTest();
    }
}