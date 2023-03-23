import { api, LightningElement } from 'lwc';

export default class LifecycleHooks extends LightningElement {

    @api
    a;

    @api
    b;

    sum;

    numClicks = 0;

    handleClick() {
        this.numClicks++;
    }

    /*
        Lifecycle Hooks are special methods that are called on your component
        at certain points in the life of the component.

        The hooks are as follows:
    */

    // Gets called when the component is created (Not the same as inserted into the DOM)
    // First lifecycle hook and code to EVER be run for your component
    // The constructor will never have any data passed in as an attribute
    constructor() {
        super(); // First call must be to super
        alert(`No values available`);
    }

    // Gets called when the component is inserted into the DOM (Not the same as created)
    // If any data is passed via an attribute, it is populated before the connected callback
    connectedCallback() {
        // At this point, our component is just about to be in the DOM
        this.sum = Number(this.a) + Number(this.b);
        alert(`Sum: ${this.sum}`);
    }

    // Gets called EVERY time the component is rendered on the screen
    renderedCallback() {
        // Be very careful with the code you put in here
        // If you change a property, it can cause an infinite loop
        // EX:  this.numClicks++; -> numClicks changes, so we rerender
        //      renderedCallback() is called
        //      this.numClicks++; -> numClicks changes, so we rerender
        //      renderedCallback() is called ... etc
        alert(`Rendered!`);
    }

    // Gets called when the component is removed from the DOM
    disconnectedCallback() {
        alert(`${this.a} and ${this.b}`);
    }

    // Gets called when a child component has an unhandled exception
    errorCallback() {

    }
}