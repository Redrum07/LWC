import { LightningElement , api} from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_RATING from '@salesforce/schema/Account.Rating';
import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';  
import { NavigationMixin } from 'lightning/navigation';
export default class RecordForm extends NavigationMixin(LightningElement) {

    @api recordId;
    @api objectApiName;

    fields = [ACCOUNT_NAME, ACCOUNT_RATING, ACCOUNT_TYPE , ACCOUNT_PHONE]

    showToast(){
        this.dispatchEvent(new ShowToastEvent({
            title : 'Success',
            message : `Account was saved`,
            variant : 'success'
        }))
    
    }

        navigateToRecord(event){
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes : {
                    objectApiName : this.objectApiName,
                    actionName : 'view',
                    recordId : event.detail.id
                }
            })
        }
}