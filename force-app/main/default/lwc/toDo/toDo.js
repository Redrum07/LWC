import { LightningElement } from 'lwc';

export default class ToDo extends LightningElement {

    taskname = '';
    taskdate = null;
    incompleteTasks = [];
    completedTasks = [];
    

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
        if(!this.taskdate){
            this.taskdate = new Date().toISOString().slice(0,10);
        }
        // need to check if the task you entered already exists or not
        if( this.validateTask()){
            this.incompleteTasks = [
                ...this.incompleteTasks , 
                {
                taskname : this.taskname,
                taskdate : this.taskdate
                }
            ];
            this.resetInput();
            this.incompleteTasks = [...this.sortedTaskList(this.incompleteTasks)];
            console.log("incompletetasks", this.incompleteTasks);
        }
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
        let index = event.target.name;
        this.incompleteTasks.splice(index,1);
        this.incompleteTasks = [...this.sortedTaskList(this.incompleteTasks)];
        
    }
    handleCheck(event){
        let index = event.target.name;
        this.refreshData(index);
    }
    dragStartHandler(event){
         event.dataTransfer.setData("index", event.target.dataset.item);

    }

    allowDrop(event){
        event.preventDefault();
    }

    dropElementHandler(event){
        let index = event.dataTransfer.getData("index");
        this.refreshData(index);
    }

    refreshData(index){
        let x = this.incompleteTasks.splice(index,1);
        this.incompleteTasks = [...this.sortedTaskList(this.incompleteTasks)];
        this.completedTasks = [...this.completedTasks,x[0]];
    }
}