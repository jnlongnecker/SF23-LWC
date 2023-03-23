import { LightningElement, api } from 'lwc';

export default class ComponentChild extends LightningElement {

    @api
    guitarist;

    @api
    imageSize;

    guitaristSelected(event) {
        let guitaristCopy = JSON.parse(JSON.stringify(this.guitarist));
        const myEvent = new CustomEvent('select', { detail: guitaristCopy });

        this.dispatchEvent(myEvent);

        /*
            CustomEvent has 2 properties that usually you won't touch but should know about
                - bubbles  : Determines whether or not the event has a bubbling phase
                - composed : Determines whether or not the event will pass the shadow boundary
                - The defaults for both are false, and should be left this way under normal circumstances

            - Use cases for not setting both to false:

            bubbles: true, composed: false
            - Fire an event that is only handled within the firing component.
            - Fire an event from a slotted element that bubbles in the parent component.

            bubbles: true, composed: true
            - Probably a bad idea
            - Use if you want your event to be handled in a grandparent/great grandparent component
            - Can cause naming collisions (events with the same name, and handlers expecting something specific
                that your event doesn't deliver)
                
            You are not allowed to set bubbles: false and composed: true

            Custom Events do not capture
        */
    }
}