import { api, LightningElement, wire } from 'lwc';
/*
    We can leverage the UI API ourselves
        - The UI API is also called the Lightning Data Service
*/
// Retrieves a record from the database
// Takes in a record ID and list of fields to retrieve
import { getRecord } from 'lightning/uiRecordApi';

// Using imports with fields is the preferred way of working with field names
// Because Salesforce can help when the field names change
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';

import getTopAccounts from '@salesforce/apex/lwcDataController.getTopAccounts';

export default class DataInLwc extends LightningElement {

    // If we use the property recordId on a record page, the page passes in the id to this property
    @api
    recordId;

    /*
        @wire and the Wire Service
            - The wire service is a way of provisioning (getting) data from Salesforce
                in the most efficient way
            - The wire service will take in a fancy method (wire adapter) and call it automatically
            - The result will be cached for maximum efficiency
            - NOTE: IMPORTANT: IT RETRIEVES DATA, and retrieves data ONLY
            - We can use '$propertyName' syntax to pass in a property to a wired method
            - If we do this, whenever propertyName changes, the wire method is ran again
    */

    @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD] })
    wiredRecord;

    // @wire can also be used with methods:
    @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD] })
    wireHandler({ error, data }) {
        if (data) {
            console.log(data);
        }
        if (error) {
            console.log(error);
        }
    }

    recordList = [];

    @wire(getTopAccounts)
    topAccountHandler({ error, data }) {
        if (data) {
            this.customRecordList = data;
        }
        if (error) {
            console.log(error.body.message);
        }
    }

    customRecordList = [];

    connectedCallback() {
        this.getAccountsUsingApex();
    }

    // Wire adapters return {data, error} where data and error are two objects
    get wiredRecordName() {
        if (!this.wiredRecord) return '';
        if (!this.wiredRecord.data) return '';
        return this.wiredRecord.data.fields.Name.value;
    }

    // Retrieves an account list using the Apex method we imported
    async getAccountsUsingApex() {
        let result = await getTopAccounts();
        this.recordList = result;
    }
}