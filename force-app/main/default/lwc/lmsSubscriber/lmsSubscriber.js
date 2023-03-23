import { LightningElement, wire, track } from 'lwc';

import guitarChannel from '@salesforce/messageChannel/guitarChannel__c';
import { subscribe, MessageContext } from 'lightning/messageService';

export default class LmsSubscriber extends LightningElement {

    @wire(MessageContext)
    context;

    @track
    messageHistory = [];

    connectedCallback() {

        // Calls the callback function whenever a new message gets posted
        this.subscription = subscribe(
            this.context, guitarChannel, (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        this.messageHistory.push(message.name);
    }
}