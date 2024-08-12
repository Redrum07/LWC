import { LightningElement ,api , wire} from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_SLA from '@salesforce/schema/Account.SLA__c';
import updateRecord  from '@salesforce/apex/AccountDetailsController.updateRecord';
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi'

export default class ImperativeApexForm extends LightningElement {

    @api recordId;

    value = ""

    @wire(getObjectInfo, { objectApiName:  ACCOUNT_OBJECT })
    wiredAccount

    @wire(getPicklistValues,{
        recordTypeId : "$wiredAccount.data.defaultRecordTypeId",
        fieldApiName : ACCOUNT_SLA
    })
    options


    handleChange(event){
        this.value = event.target.value;
    }


    handleClick(){

        updateRecord({ recordId : this.recordId , Sla : this.value})
        .then((result)=>{
            console.log('success', result)
            notifyRecordUpdateAvailable([{recordId: this.recordId}])
        })
        .catch(error =>{
            console.log(error)
        })
    }



}