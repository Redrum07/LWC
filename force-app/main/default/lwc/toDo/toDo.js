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
        
        //if date input is empty then fill the date input with today's date
        // if(!this.taskdate){
        //     this.taskdate = new Date().toISOString().slice(0,10);
        // }
        // // need to check if the task you entered already exists or not
        // if( this.validateTask()){
        //     this.incompleteTasks = [
        //         ...this.incompleteTasks , 
        //         {
        //         taskname : this.taskname,
        //         taskdate : this.taskdate
        //         }
        //     ];

        //     this.resetInput();
        //     this.incompleteTasks = [...this.sortedTaskList(this.incompleteTasks)];
        //     console.log("incompletetasks", this.incompleteTasks);
            
        // }
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

    validateTask(){
        
        let isValid = true;
        
        let element = this.template.querySelector('.taskname')
        if(!this.taskname){
            isValid = false;
        }
        else{
        let task = this.incompleteTasks.find(
            (currentItem) =>
                currentItem.taskname === this.taskname &&
                currentItem.taskdate === this.taskdate
            );
        
        if(task){
            isValid = false;
            element.setCustomValidity("Task already exists");
        }
    }
        if(isValid){
            element.setCustomValidity("");
        }

        element.reportValidity();
        return isValid;
    }
    
    sortedTaskList(inputArr){
       
      let sortedarray =   inputArr.sort((a,b) => {
            const dateA = new Date(a.taskdate);
            const dateB = new Date(b.taskdate);
            return dateA- dateB;
       });
       return sortedarray;
    }

    handleDelete(event){
        this.showToast(
            'SUCCESS' ,
            `Task deleted successfully` ,
            'error'
        )
        
        deleteRecord(event.target.name).then(()=>{
            refreshApex(this.incompleteTasksData)
            console.log('Records deleted succesfully')
        })
        
        // let index = event.target.name;
        // this.incompleteTasks.splice(index,1);
        // this.incompleteTasks = [...this.sortedTaskList(this.incompleteTasks)];
        
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
        // let x = this.incompleteTasks.splice(index,1);
        // this.incompleteTasks = [...this.sortedTaskList(this.incompleteTasks)];
        // this.completedTasks = [...this.completedTasks,x[0]];
        let upfields = {};
       
        upfields[TM_ID.fieldApiName] = recordId;
        upfields[TM_ISCOMPLETED.fieldApiName] = true ;
        upfields[TM_COMPLETED_DATE.fieldApiName]  = new Date().toISOString.slice(0,10);

        console.log(upfields);
        let recordInput = {
            fields : upfields
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