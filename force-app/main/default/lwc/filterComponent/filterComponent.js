import { LightningElement, wire} from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import  { NavigationMixin } from 'lightning/navigation';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import INDUSTRY from '@salesforce/schema/Account.Industry';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';

export default class FilterComponent extends NavigationMixin(LightningElement) {

    accid = "";
    selectedIndustry = ""
    isdisabled = true;
   
    @wire(getObjectInfo,{objectApiName : ACCOUNT_OBJECT})
    account
    

    @wire(getPicklistValues,{
        recordTypeId : "$account.data.defaultRecordTypeId",
        fieldApiName : INDUSTRY
    })
    industry;


    handlefilterSelected(event){
        this.accid = event.detail;
        
        if(this.accid){
            this.isdisabled = false;
        }else{
            this.isdisabled = true;
        }
        this.sendFilterValuesToParent()
    }

    handleChange(event){
        this.selectedIndustry = event.target.value;
        this.sendFilterValuesToParent()
    }

    addNewContact(){

        let defaultValues = encodeDefaultFieldValues({

            AccountId : this.accid
        });
        
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'Contact',
                actionName : 'new'
            },
            state : {
                defaultFieldValues : defaultValues
            }
        })
    }


    sendFilterValuesToParent(){
        this.dispatchEvent(new CustomEvent('filters',{
            detail : {
                Industry : this.selectedIndustry,
                accid : this.accid
            }
        }))
    }

}