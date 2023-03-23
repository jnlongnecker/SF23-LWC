import { LightningElement, api } from 'lwc';

export default class InteractionTarget extends LightningElement {
    @api
    name;

    @api
    image;

    @api
    rating;
}