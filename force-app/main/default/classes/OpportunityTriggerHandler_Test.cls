@isTest
public with sharing class OpportunityTriggerHandler_Test {
    

    @TestSetup
    static void makeData(){
        List<Opportunity> opp = new List<Opportunity>();
        List<Account> Acc = new List<Account>();
        for(Integer i = 0; i < 1; i++){
            Account a = new Account(Name = 'Test Acc ' + i);
            Acc.add(a);
            }
        insert Acc;

        for(Integer i = 0; i < 2; i++){
            Opportunity o = new Opportunity(Name = 'Test Opp '+i, CloseDate = System.today(), Amount = 100, StageName = 'Prospecting');
            o.AccountId = Acc[0].Id;
            opp.add(o);
            }
        
        insert opp;
    }

    @isTest
    public static void testAfterDeleteHandler(){
        List<Opportunity> op = [Select id , AccountId , Account.Related_Opp_Amount_Rollup__c from Opportunity WHERE Name='Test Opp 0'];

        Test.startTest();
        delete op;
        Test.stopTest();

        Account ac = [Select Related_Opp_Amount_Rollup__c from Account Where Id =: op[0].AccountId ];

        Assert.areEqual(100, ac.Related_Opp_Amount_Rollup__c, 'The value was not updated');

    }


    @isTest
    public static void testAFterUndeleteHandler(){
        List<Opportunity> op = [Select id , AccountId from Opportunity WHERE Name='Test Opp 0'];
        delete op;
        Test.startTest();
        undelete op;
        Test.stopTest();

        Account ac = [Select Related_Opp_Amount_Rollup__c from Account Where Id =: op[0].AccountId ];
        
        Assert.areEqual(200, 200, 'The value was not updated');
    
    }
}