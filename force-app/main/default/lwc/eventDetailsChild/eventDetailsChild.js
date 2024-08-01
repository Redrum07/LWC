import { LightningElement ,api ,wire } from 'lwc';

export default class EventDetailsChild extends LightningElement {

@api contact;



clickHandler(event){
        event.preventDefault(); // to prevent the anchor tag from navigating   
       this.dispatchEvent(new CustomEvent('flick',
       {
        detail : this.contact.Id
    }));
   }     
}