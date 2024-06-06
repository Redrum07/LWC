import { LightningElement ,wire, api} from 'lwc';
import searchRecords from '@salesforce/apex/customLookupController.searchRecords'
const DELAY = 300;
export default class CustomLookup extends LightningElement {

@api apiName = ''
key = '';
@api objectLabel = "";
@api iconName = "";
delayTimeout;
displayOptions = false;
record = {
    selectedid : "",
    selectedName : ""
}
    @wire (searchRecords ,
    {
        objectApiName : '$apiName',
        searchKey : "$key"
    })
    outputs;
    
    get isRecordSelected(){
      return this.record.selectedid === ''  ? false : true;
     }

    changeHandler(event){
        window.clearTimeout(this.delayTimeout);
        let enteredValue = event.target.value;
       
        this.delayTimeout = setTimeout(()=> {
            this.key = enteredValue;
            this.displayOptions = true;
        }, DELAY);
    }

    handleClick(event){
        this.displayOptions = false;
        let selectedid = event.currentTarget.dataset.item;
        console.log('SelectedID', selectedid);
        let selectedRecord = this.outputs.data.find(record => record.Id === selectedid);
        console.log('selectedRecord', selectedRecord);
    
       this.record = {
            selectedid : selectedRecord.Id,
            selectedName : selectedRecord.Name
        }
    
    }

    removalSelectionHandler(event){
        this.record = {
            selectedid : '',
            selectedName : ""
        }
    }
    
}