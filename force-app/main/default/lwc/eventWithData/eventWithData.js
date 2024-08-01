import { LightningElement , wire} from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { publish, MessageContext } from 'lightning/messageService';
import sendMessage from '@salesforce/messageChannel/sendMessage__c';
export default class EventWithData extends LightningElement {
contacts
error
selectedContact
@wire(getContacts)
condata({ data,error }) {
    if(data){
        this.contacts = data;
    }
    if(error){
        this.error = error;
    }
}


@wire(MessageContext)
messageContext;


   
 handleEvent(event){
     let selectedId = event.detail;
     console.log('selectedid-->' , selectedId);
this.selectedContact = this.contacts.find((currItem) => currItem.Id === selectedId)   
    const payload = { lmsdata: this.selectedContact };

    publish(this.messageContext, sendMessage, payload);
 }


}