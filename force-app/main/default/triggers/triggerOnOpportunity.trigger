/**
When an opportunity is marked as closed won, create follow-up tasks for the sales team to enagage
with the customer, schedule a welcome call and send a thank you email
Also update the next steps on Opportunity to "Onboard a contract"
*/

trigger triggerOnOpportunity on Opportunity (before insert , after insert, before update, after update) {

    switch on Trigger.operationType {
        when BEFORE_INSERT , BEFORE_UPDATE{

            for(Opportunity Opp : trigger.new){
                if(Opp.StageName == 'Closed Won'){
                    Opp.NextStep = 'Onboard a contract';
                }
            }
        
        }
        when AFTER_INSERT , AFTER_UPDATE{

            List<Task> taskList = new List<Task>();
            
            for(Opportunity opp : trigger.new){
                if(opp.StageName == 'Closed Won'){

                    taskList.add(new Task(Subject = 'Follow up' , OwnerId = opp.OwnerId , Priority = 'High' , Status = 'Not Started' , WhatId = opp.Id ));
                    taskList.add(new Task(Subject = 'Send Welcome Email' , OwnerId = opp.OwnerId , Priority = 'High' , Status = 'Not Started' , WhatId = opp.Id ));
                    taskList.add(new Task(Subject = 'Schedule a call' , OwnerId = opp.OwnerId , Priority = 'High' , Status = 'Not Started' , WhatId = opp.Id ));

                }
            }
            insert taskList;
        }

    }
    
}