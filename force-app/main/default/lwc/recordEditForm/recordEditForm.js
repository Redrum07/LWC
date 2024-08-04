import { LightningElement ,api} from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import ACCOUNT_SLAEXPIRATIONDATE from '@salesforce/schema/Account.SLAExpirationDate__c';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecordEditForm extends NavigationMixin(
    LightningElement) {

    @api recordId;
    @api objectApiName;

    fieldObject = {
        name : ACCOUNT_NAME,
        industry : ACCOUNT_INDUSTRY,
        sla : ACCOUNT_SLAEXPIRATIONDATE
    }
    
  
    
    handleSuccess(event){
        
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                objectApiName: this.objectApiName,
                actionName: 'view',
                recordId : event.detail.id
            }
        });
    }

   
    handleError(event){

       
        const x = new ShowToastEvent({
            title : "Error",
            variant : 'error',

            message : event.detail.detail,
            mode : "sticky"
        })
        this.dispatchEvent(x);
        }
        
        handleSubmit(event){
            //check if industry is blank on submit
            event.preventDefault();
            const fields = event.detail.fields;
            if(!fields.Industry){
                fields.Industry = 'Energy'
            }
            this.template.querySelector('lightning-record-edit-form').submit(fields);
        }

        resetHandler(){
           let inputFields = this.template.querySelectorAll('lightning-input-field');
            
           inputFields.forEach((crrItm) => crrItm.reset());
        }
}