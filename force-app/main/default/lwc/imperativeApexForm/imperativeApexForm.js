import { LightningElement ,api , wire} from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_SLA from '@salesforce/schema/Account.SLA__c';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import updateRecord  from '@salesforce/apex/AccountDetailsController.updateRecord';
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi'

export default class ImperativeApexForm extends LightningElement {

    @api recordId;
    accName = ''
    
    value = ""

    @wire(getObjectInfo, { objectApiName:  ACCOUNT_OBJECT })
    wiredAccount
    
    @wire(getPicklistValues,{
        recordTypeId : "$wiredAccount.data.defaultRecordTypeId",
        fieldApiName : ACCOUNT_SLA
    })
    options

    @wire(getRecord,{
        recordId: "$recordId",
        fields : [ACCOUNT_NAME , ACCOUNT_SLA]
    })
    wiredRecord({data,error}){
        if(data){
            this.accName = data.fields.Name.value
            this.value = data.fields.SLA__c.value
        }
    }

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