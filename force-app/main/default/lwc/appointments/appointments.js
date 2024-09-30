import { LightningElement , wire } from 'lwc';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import restaurantDetails from '@salesforce/messageChannel/restaurantDetails__c';

export default class Appointments extends LightningElement {
    

    subscription = null; 
    lat = null;
    long = null;
    name;
    @wire(MessageContext)
    messageContext;

   

    subscribeToMessageChannel() {
        if(!this.subscription){
            this.subscription = subscribe(
                this.messageContext,
                restaurantDetails,
                (message) => this.handleMessage(message),
            
            )
        }
    }

    unsubscribeToMessageChannel() {
       
            unsubscribe(this.subscription);
            this.subscription = null;

    }
    handleMessage(message){
        console.log(message);
        this.name = message.name;
        this.lat = message.lat;
        this.long = message.long;
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    // need this to render every time we click the restaurant so has to be dynamic
    get showMap(){
        return (this.lat != null && this.long != null) ? true : false;
    }
    // once the new values of lat and long come in , the showMap re-renders and all the getters are
    //evaluated hence the map is re-rendered and the markers are placed on the map
    get mapMarkers(){
        return [
            {
                location: {
                    Latitude: this.lat,
                    Longitude: this.long,
                },
            },
        ];
    } 

}