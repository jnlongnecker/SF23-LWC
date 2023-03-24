import { createElement } from 'lwc';
import DataInLwc from 'c/dataInLwc';

/*
    When we work with components that use imported methods to get data,
    we will want to import those methods ourselves in our test.
    This is because these methods are NEVER actually going to complete,
    and we don't want them to either. If we rely on these methods actually
    getting data that doesn't exist on our computer, when that data changes
    our tests may break.
*/

import { getRecord } from 'lightning/uiRecordApi';
import getTopAccounts from '@salesforce/apex/lwcDataController.getTopAccounts';

const mockAccount = require('./data/mockAccount.json');
const mockAccountList = require('./data/mockAccountList.json');

// This is necessary to work with imperative method calls
import { setImmediate } from 'timers';

jest.mock(
    '@salesforce/apex/lwcDataController.getTopAccounts', // Endpoint we're mocking
    () => require('./topAccountMock.js'), // Response of the endpoint
    { virtual: true } // Whether the endpoint is on our machine or not
);

describe('c-data-in-lwc', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('diplays wired top records properly', async () => {
        const element = createElement('c-data-in-lwc', {
            is: DataInLwc
        });

        document.body.appendChild(element);

        // We use the mock adapter to emit the response for the wire adapter
        getTopAccounts.emit(mockAccountList);

        await Promise.resolve();

        // We're expecting to have a list of paragraphs
        const pList = element.shadowRoot.querySelectorAll('.slds-col p');
        expect(pList).toHaveLength(mockAccountList.length);

        // Ensure each one matches up
        for (let i = 0; i < mockAccountList.length; i++) {
            expect(pList[i].textContent).toBe(mockAccountList[i].Name);
        }
    });

    it('displays imperative top accounts properly', async () => {
        const element = createElement('c-data-in-lwc', {
            is: DataInLwc
        });

        // We need to mock the value first because the imperative method gets called in the
        // connectedCallback() hook
        getTopAccounts.mockResolvedValue(mockAccountList);

        document.body.appendChild(element);

        // Using setImmediate causes the Promise to resolve after all other queued promises finish
        // This includes our imperative method callout and the refresh of the page
        await new Promise(setImmediate);

        // We expected the getTopAccounts() method to be imperatively called
        expect(getTopAccounts).toBeCalled();
        const pList = element.shadowRoot.querySelectorAll('.slds-col p');
        expect(pList).toHaveLength(mockAccountList.length);

        for (let i = 0; i < mockAccountList.length; i++) {
            expect(pList[i].textContent).toBe(mockAccountList[i].Name);
        }
    });

    it('displays UI API wired record properly', async () => {
        const element = createElement('c-data-in-lwc', {
            is: DataInLwc
        });

        document.body.appendChild(element);

        // From a wire adapter, we can emit the record the wire service is waiting for
        getRecord.emit(mockAccount);

        // Wait for the DOM to refresh
        await Promise.resolve();

        const p = element.shadowRoot.querySelector('.slds-align_absolute-center');
        expect(p.textContent).toBe(`Basic Info from the Page: ${mockAccount.fields.Name.value}`);
    });
});