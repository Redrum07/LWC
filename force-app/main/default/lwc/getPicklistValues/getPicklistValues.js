import { LightningElement ,wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';

import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';

export default class GetPicklistValues extends LightningElement {

@wire(getPicklistValues,{recordTypeId : "012J3000000CgPbIAK" , fieldApiName : ACCOUNT_INDUSTRY})
    wiredValues({data,error}){
        if(data){
            console.log('data', data);
        }
        else if(error){
            console.log('error' , error);
        }
    }

}