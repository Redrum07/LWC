
let input = prompt("What would you like to do?");
const toDoList = [];

while( input !== 'quit'){
        
        
        if(input.toLowerCase() === 'new'){

            let newToDo = prompt("Enter your task");
            toDoList.push(newToDo);
            console.log(newToDo + " added to the list");
            input = prompt("What would you like to do?");
        }

        else if( input.toLowerCase() === 'list'){

            if(toDoList.length === 0){
                console.log("No tasks to show");

            }
            else{
                console.log("****TASKS****")
                for(tasks of toDoList){
                    console.log(tasks);
                }
                console.log("****END****");
                
            }
            
        }
        else if(input.toLowerCase() === 'delete'){

            let deleteTask = parseInt(prompt('Enter index of the task you want to delete'));
            
            if(deleteTask < 0 || deleteTask > toDoList.length || Number.isNaN(deleteTask)){
                console.log("Array out of bounds");
            }
            else{
                const deleted = toDoList.splice(deleteTask ,1);
                console.log("***********");
                console.log("TO DO REMOVED : " + deleted[0]);
                console.log("***********");
                input = prompt("What would you like to do next?");
                
                }
            
        }
    
        input = prompt("What would you like to do next?");
    
}

console.log("OK Quitting!!")




