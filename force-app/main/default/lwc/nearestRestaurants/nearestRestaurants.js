import { LightningElement , wire , api} from 'lwc';
import getRestaurants from '@salesforce/apex/RestaurantFinder.getRestaurants';
import {
  
    MessageContext,
    publish
    
} from 'lightning/messageService';
import restaurantDetails from '@salesforce/messageChannel/restaurantDetails__c';

export default class NearestRestaurants extends LightningElement {
    
    @api recordId;
    
    @wire(getRestaurants, {ContactId : '$recordId'})
    restaurants
    
    @wire(MessageContext)
    messageContext;     

    handleClick(event){
       event.preventDefault();
    
        const payload = {
            name : event.target.getAttribute('data-name'),
            lat : event.target.getAttribute('data-lat'),
            long : event.target.getAttribute('data-long'),
        }
      
        publish(this.messageContext, restaurantDetails, payload);
    }

}
