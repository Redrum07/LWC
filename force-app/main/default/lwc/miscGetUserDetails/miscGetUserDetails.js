import { LightningElement , wire} from 'lwc';
import USER from '@salesforce/user/Id';
import LABEL from  '@salesforce/label/c.loggedInUser';
import USER_NAME from '@salesforce/schema/User.Name';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';

export default class MiscGetUserDetails extends LightningElement {

    label = LABEL;
    user = ""
@wire(getRecord,{
    recordId : USER,
    fields :[USER_NAME]
})
wiredData({data,error}){
    if(data){
        this.user = getFieldValue(data,USER_NAME)
        console.log(this.user);
    }
    else if(error){
        console.log(error);
    }
}
}