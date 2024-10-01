import { LightningElement, wire, api } from "lwc";
import {
  subscribe,
  unsubscribe,
  APPLICATION_SCOPE,
  MessageContext
} from "lightning/messageService";
import restaurantDetails from "@salesforce/messageChannel/restaurantDetails__c";
import createAppointment from "@salesforce/apex/RestaurantFinder.createAppointment";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Appointments extends LightningElement {
  subscription = null;
  lat = null;
  long = null;
  name;
  duration;
  dt;
  @api recordId;

  
  @wire(MessageContext)
  messageContext;

  subscribeToMessageChannel() {
    if (!this.subscription) {
      this.subscription = subscribe(
        this.messageContext,
        restaurantDetails,
        (message) => this.handleMessage(message)
      );
    }
  }

  unsubscribeToMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }
  handleMessage(message) {
    console.log(message);
    this.name = message.name;
    this.lat = message.lat;
    this.long = message.long;
  }

  connectedCallback() {
    this.subscribeToMessageChannel();
    console.log('Record ID in connectedCallback:', this.recordId); // Check if recordId is available here

  }

  disconnectedCallback() {
    this.unsubscribeToMessageChannel();
  }

  // need this to render every time we click the restaurant so has to be dynamic
  get showMap() {
    return this.lat != null && this.long != null ? true : false;
  }
  // once the new values of lat and long come in , the showMap re-renders and all the getters are
  //evaluated hence the map is re-rendered and the markers are placed on the map
  get mapMarkers() {
    return [
      {
        location: {
          Latitude: this.lat,
          Longitude: this.long
        }
      }
    ];
  }
  handleChange(event) {
    if (event.target.name === "AppointmentDate") {
      this.dt = event.target.value;
    }
    if (event.target.name === "Duration") {
      this.duration = event.target.value;
    }
  }
  handleClick(event) {
    console.log(this.recordId);
    createAppointment({
      dt: this.dt,
      contactId: this.recordId,
      duration: this.duration,
      res: this.name
    })
    .then(()=>{
        this.dispatchEvent(new ShowToastEvent({
            title : 'Appointment',
            message : 'Booked Successfully',
            variant : 'success'
        }));
    
    })
    .catch((error)=>{
        console.log(error);
        this.dispatchEvent(new ShowToastEvent({
            title : 'Error',
             message : error,
             variant : 'error'
        }))
    })
  }
}
