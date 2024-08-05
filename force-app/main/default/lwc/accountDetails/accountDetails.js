import { LightningElement , wire} from 'lwc';
import getParentAccount from '@salesforce/apex/AccountDetailsController.getParentAccount'
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_SLA_TYPE from '@salesforce/schema/Account.SLA__c'
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_SLA_EXPIRATION_DATE from '@salesforce/schema/Account.SLAExpirationDate__c'
import ACCOUNT_NO_OF_LOCATIONS from '@salesforce/schema/Account.NumberOfLocations__c'
import ACCOUNT_DESCRIPTION from '@salesforce/schema/Account.Description'
import ACCOUNT_NAME from '@salesforce/schema/Account.Name'
import ACCOUNT_PARENT_ID from '@salesforce/schema/Account.ParentId'
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountDetails extends LightningElement {
    
    parentOptions = [];
    selectedParent = ""
    accountName = ""
    noOfLocations = '1'
    slaExpirationDate = ''
    selectedSlaType = ""
    myVal = ""


    @wire(getObjectInfo,{
        objectApiName : ACCOUNT_OBJECT
    })
    objectInfo
    
    @wire( getPicklistValues,{
        recordTypeId : "$objectInfo.data.defaultRecordTypeId",
        fieldApiName : ACCOUNT_SLA_TYPE
    })
    slaValues

    @wire(getParentAccount)
    wiredData({data,error}){
        if(data){
           this.parentOptions = data.map((currentItem) =>(

                {   'label' : currentItem.Name,
                    'value' : currentItem.Id
                }
            ))
           
        }
        else if(error){
            console.log(error);
        }
    }

    handleChange(event){
        let {name , value} = event.target;
        if(name === 'parentAccount'){
            this.selectedParent = value;
        }
    }

    handleAccount(event){
        this.accountName = event.target.value;
    }

    handleSlider(event){
        this.noOfLocations = event.target.value;
    }

    handleSlaDate(event){
        this.slaExpirationDate = event.target.value;
    }

    handleSlaType(event){
        this.selectedSlaType = event.target.value;
    }

    handleDescription(event){
        this.myVal = event.target.value;

    }

    async createAccount(){

        const fields = {}
        fields[ACCOUNT_PARENT_ID.fieldApiName] = this.selectedParent;
        fields[ACCOUNT_SLA_EXPIRATION_DATE.fieldApiName] = this.slaExpirationDate;
        fields[ACCOUNT_NO_OF_LOCATIONS.fieldApiName] = this.noOfLocations;
        fields[ACCOUNT_DESCRIPTION.fieldApiName] = this.myVal;
        fields[ACCOUNT_NAME.fieldApiName] = this.accountName;

        const recordInput = { apiName : ACCOUNT_OBJECT.objectApiName , fields} ;

        const result = await createRecord(recordInput);

        this.dispatchEvent(new ShowToastEvent({
            title : 'SUCCESS',
            message : 'Account Created',
            variant : 'success'
        }))
           
        }
        
        
}