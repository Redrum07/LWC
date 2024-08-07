import { LightningElement , wire , api} from 'lwc';
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
import ACCOUNT_ID from '@salesforce/schema/Account.Id';

import { createRecord , getRecord , getFieldValue , updateRecord, deleteRecord} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import {NavigationMixin} from  'lightning/navigation';

const FIELDS = [ACCOUNT_PARENT_ID , ACCOUNT_NAME , ACCOUNT_DESCRIPTION , ACCOUNT_NO_OF_LOCATIONS ,
    ACCOUNT_SLA_EXPIRATION_DATE, ACCOUNT_SLA_TYPE]

export default class AccountDetails extends NavigationMixin(LightningElement) {
    
    parentOptions = [];
    selectedParent = ""
    accountName = ""
    noOfLocations = '1'
    slaExpirationDate = ''
    selectedSlaType = ""
    myVal = ""
    @api recordId

    @wire(getRecord,{
        recordId : "$recordId",
        fields : FIELDS
    })
    accountData({data,error}){
        if(data){
            console.log(data);
            this.selectedParent = getFieldValue(data,ACCOUNT_PARENT_ID);
            this.accountName = getFieldValue(data,ACCOUNT_NAME);
            this.noOfLocations = getFieldValue(data,ACCOUNT_NO_OF_LOCATIONS);
            this.slaExpirationDate = getFieldValue(data,ACCOUNT_SLA_EXPIRATION_DATE);
            this.selectedSlaType = getFieldValue(data,ACCOUNT_SLA_TYPE);
            this.myVal = getFieldValue(data,ACCOUNT_DESCRIPTION);
        }
        else if(error){
            console.log('Error while retriving' , error);
        }
    }


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
        fields[ACCOUNT_SLA_TYPE.fieldApiName] = this.selectedSlaType;
        const recordInput = { apiName : ACCOUNT_OBJECT.objectApiName , fields} ;
        

        if(this.recordId){

            fields[ACCOUNT_ID.fieldApiName]= this.recordId;
            const updateRecordInput = fields;
            try{

                const result = await updateRecord(updateRecordInput);
                console.log(result);
                
                this.dispatchEvent(new ShowToastEvent({
                    title : 'SUCCESS',
                    message : "Account Updated",
                    variant : 'success'
                }))
            }
            catch(error){
                console.log(error);
            }
            
        }
        else{
            
            try{
                const result = await createRecord(recordInput);
                console.log(result);
                
    
                this.dispatchEvent(new ShowToastEvent({
                title : 'SUCCESS',
                message : 'Account Created',
                variant : 'success'
            }))
               
            this[NavigationMixin.Navigate]({
                type : 'standard__recordPage',
                attributes :{
                    recordId : result.id,
                    objectApiName : ACCOUNT_OBJECT.objectApiName,
                    actionName : 'view'
                }
            })
           
            }
            catch(error){
                console.log(error);
            }

        }
        
    }
        
    
    get title(){

         return this.recordId ? 'Edit Account' : 'Create Account';
    }
       
    get delButton(){
        return this.recordId ? true : false;
    }
    
     deleteAccount(){

        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes: {

                objectApiName : ACCOUNT_OBJECT.objectApiName,
                actionName : 'list'
            },
            state : {
                filterName : 'Recent'
            }
        })
        this.dispatchEvent(new ShowToastEvent({
            title : 'SUCCESS',
            message : 'Account Deleted',
            variant : 'success'
        }))
       
       
        
             deleteRecord(this.recordId)
    }
}