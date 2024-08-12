import { LightningElement , wire } from 'lwc';
import { createRecord, deleteRecord, updateRecord  } from 'lightning/uiRecordApi';
import TASK_MANAGER from '@salesforce/schema/Task_Manager__c';
import TM_NAME from '@salesforce/schema/Task_Manager__c.Name';
import TM_TASK_DATE from '@salesforce/schema/Task_Manager__c.Task_Date__c';
import TM_COMPLETED_DATE from '@salesforce/schema/Task_Manager__c.Completed_Date__c';
import TM_ISCOMPLETED from '@salesforce/schema/Task_Manager__c.isCompleted__c';
import TM_ID from '@salesforce/schema/Task_Manager__c.Id';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getCompletedTasks from '@salesforce/apex/TaskManagerController.getCompletedTasks';
import getIncompletedTasks from '@salesforce/apex/TaskManagerController.getIncompletedTasks';
import {refreshApex} from '@salesforce/apex';


export default class ToDo extends LightningElement {

    taskname = '';
    taskdate = null;
    incompleteTasks = [];
    completedTasks = [];
    incompleteTasksData ;
    completedTasksData ;

    @wire(getIncompletedTasks)
    wiredIncompleteTask(result){
        this.incompleteTasksData = result;
        let {data , error} = result;
        if(data){
            this.incompleteTasks = data.map(currentItem =>({
                taskId : currentItem.Id,
                taskname : currentItem.Name,
                taskdate : currentItem.Task_Date__c
            }))
        }
    }

    @wire(getCompletedTasks)
    wiredCompleteTask(result){
        this.completedTasksData = result;
        let {data,error} = result;
        if(data){
            this.CompleteTasks = data.map(currentItem =>({
                taskId : currentItem.Id,
                taskname : currentItem.Name,
                taskdate : currentItem.Task_Date__c
            }))
        }
    }


    changeHandler(event){
        let {name,value} = event.target;
        if(name === "task"){
            this.taskname = value;
            
        }
        else if(name === "taskdate"){
            this.taskdate = value;
        }
    }
    

    handleClick(){
        
            const infields = {};
                infields[TM_NAME.fieldApiName] = this.taskname;
                infields[TM_TASK_DATE.fieldApiName] = this.taskdate;
                infields[TM_COMPLETED_DATE.fieldApiName] = null;

            let recordInput = {
                apiName : TASK_MANAGER.objectApiName,
                fields : infields
            };
            createRecord(recordInput)
            .then(record => {
                console.log('Record Created Successfully');
                this.showToast('SUCCESS' , `Task created successfully` , 'success');
                refreshApex(this.incompleteTasksData);
                this.resetInput();
            })
            .catch(error => {
                console.log(error);
                this.showToast('ERROR' , `Task could not be created successfully` , 'error');
            });
        
    }

    resetInput(){
        this.taskdate = null;
        this.taskname = "";
    }


    handleDelete(event){
        
        deleteRecord(event.target.name).then(()=>{
            this.showToast(
                'SUCCESS' ,
                `Task deleted successfully` ,
                'error'
            )
            
            refreshApex(this.incompleteTasksData)
            console.log('Records deleted succesfully')
        })
         
    }


    handleCheck(event){
        let recordId = event.target.name;
        this.refreshData(recordId);
    }

    dragStartHandler(event){
         event.dataTransfer.setData("index", event.target.dataset.item);
    }

    allowDrop(event){
        event.preventDefault();
    }

    dropElementHandler(event){
        let recordId = event.dataTransfer.getData("index");
        this.refreshData(recordId);
    }

   async refreshData(recordId){
        const fields = {};

        fields[TM_ID.fieldApiName] = recordId;
        fields[TM_ISCOMPLETED.fieldApiName] = true ;
        fields[TM_COMPLETED_DATE.fieldApiName]  = new Date().toISOString.slice(0,10);

        let recordInput = {
            fields : fields
        }

        try {
            await updateRecord(recordInput)
            await refreshApex(this.incompleteTasksData);
            await refreshApex(this.completedTasksData);

            this.showToast('SUCCESS' , `Task completed successfully` , 'success');
            console.log('Records updated succesfully')

        } catch (error) {
            console.log('Update operation failed ->', error)
            this.showToast('ERROR' , 'Task could not be completed successfully', 'error');
        }
 
    }


    showToast(title,message,variant){
        this.dispatchEvent(new ShowToastEvent({
             title : title,
             message : message,
             variant : variant
        }))
    }
}