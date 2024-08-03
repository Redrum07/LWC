import { LightningElement ,api } from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_RATING from '@salesforce/schema/Account.Rating';
import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';

export default class RecordViewForm extends LightningElement {

    @api objectApiName;
    @api recordId;

    fieldObject = {
        Name : ACCOUNT_NAME,
        Rating : ACCOUNT_RATING,
        Type : ACCOUNT_TYPE,
        Phone : ACCOUNT_PHONE
    }

}