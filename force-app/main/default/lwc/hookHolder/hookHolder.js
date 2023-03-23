import { LightningElement } from 'lwc';

export default class HookHolder extends LightningElement {

    showHooks = true;

    toggleHooks() {
        this.showHooks = !this.showHooks;
    }
}