import { LightningElement, wire } from 'lwc';

import guitarChannel from '@salesforce/messageChannel/guitarChannel__c';
import { publish, MessageContext } from 'lightning/messageService';

export default class LmsNotifier extends LightningElement {

    // Used to set the scope of the channel
    @wire(MessageContext)
    context;

    guitarists = [
        'Stevie Ray Vaughn',
        'Jimi Hendrix',
        'Mark Knopfler',
        'Yvette Young',
        'Tim Henson'
    ];

    /*
        If we want to communicate across the DOM to unrelated components, the best
        way of doing so is to use the Lightning Message Service (LMS)

        - Uses a pub-sub (publish-subscribe) architecture just like platform events
        - Components opt in to receiving messages and can handle them in the way they want
        - Many components can be a notifier or publisher of messages to the channel
        - LMS works across an app page and across front-end frameworks
            - Can communicate to an Aura Component
            - Can communicate to a Web Component
            - Can communicate to Visualforce
    */

    publishMessage() {
        // Pick a random number between 0 - (length -1)
        const selection = Math.floor(Math.random() * this.guitarists.length);
        const data = this.guitarists[selection];

        const message = { name: data };
        publish(this.context, guitarChannel, message);
    }
}