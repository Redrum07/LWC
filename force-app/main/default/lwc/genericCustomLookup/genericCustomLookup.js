import { LightningElement , wire ,api } from 'lwc';
import searchRecords from '@salesforce/apex/customLookupController.searchRecords'
const DELAY = 300;
export default class CustomLookup extends LightningElement {

key ;
@api apiName = "";
@api objectLabel = '';
@api iconName = '';               
delayTimeOut;

selectedRecord = {
    Id : "",
    Name : ""
}
display = false;
@wire(searchRecords,
    {objectApiName : "$apiName", 
    searchKey : "$key"})
records;    

get isSelected(){
    return this.selectedRecord.Id === ""?false: true;
}

handleSearch(event){
    window.clearTimeout(this.delayTimeOut);

    let enteredValue = event.target.value;
    
     this.delayTimeOut = setTimeout(()=>{
        this.key = enteredValue;
        this.display = true;
        },DELAY);
        
    }

clickHandler(event){
    let selectedId = event.currentTarget.dataset.item;

    let outputRecord = this.records.data.find(record => record.id === selectedId);

    this.selectedRecord={
        Id : outputRecord.id,
        Name : outputRecord.Name
    }
    this.display = false;
}

handleRemoval(event){
    this.selectedRecord = {
        Id :"",
        Name : ""
    }
    this.display = false;
    }

}
