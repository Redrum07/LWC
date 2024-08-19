import { LightningElement ,api} from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import { updateRecord } from 'lightning/uiRecordApi';
import {CloseActionScreenEvent} from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class ScreenQuickAction extends LightningElement {

    @api recordId;
    @api objectApiName;
    name;
    industry;


    handleSuccess(){
        this.dispatchEvent(new ShowToastEvent({
            title: 'Success',
            variant : 'success',
            message: 'Account updated'
        }));
        this.dispatchEvent(new CloseActionScreenEvent());
    }

    handleCancel(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }


}