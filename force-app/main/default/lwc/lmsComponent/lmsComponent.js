import { LightningElement , wire } from 'lwc';
import {
    subscribe,
    unsubscribe,
    APPLICATION_SCOPE,
    MessageContext,
} from 'lightning/messageService';
import sendMessage from '@salesforce/messageChannel/sendMessage__c';
export default class LmsComponent extends LightningElement {

    subscription = null;
    selectedContact;

    @wire(MessageContext)
    messageContext;

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                sendMessage,
                (message) => this.handleMessage(message)
            );
        }
    }
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }
    handleMessage(message) {
        this.selectedContact = message.lmsdata;
    }
}