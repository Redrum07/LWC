import { LightningElement , wire} from 'lwc';
import getContacts from '@salesforce/apex/ContactBrowserController.getContacts';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
]
export default class ContactBrowser extends LightningElement {
    
    accountId 
    industry 
    columns = COLUMNS;
    handleFilters(event){
        
        this.accountId = event.detail.accid;
        this.industry = event.detail.Industry
       
    }

    @wire(getContacts,
        {   
            accountId :"$accountId",
            industry : "$industry"
    })
    contacts
   


}