// createElement is a method only available in tests. It allows us to create a LWC
import { createElement } from 'lwc';

// Import the component from our JS file to create the component from
import LwcBasics from 'c/lwcBasics';

// describe takes a name and a function that contains all of the tests we want to run
// It represents a test suite
describe('c-lwc-basics', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    /*
        The it block represents a single unit test
        This block can also be called the test block (aka you can use the word test instead of it)
        The two versions (test and it) work identical
    */
    it('displays different paragraph text for clicks of a button', async () => {
        const element = createElement('c-lwc-basics', {
            is: LwcBasics
        });

        // Expecting @api attributes to be set here

        document.body.appendChild(element);

        // Pop Quiz: What lifecycle hooks are fired by this line?

        /*
            Asserts in Jest are done with the expect() function and use matchers
            Matchers are functions that can be chained on the expect to provide context to what
            you want the value to be
        */

        // We can query for elements we want to check on with the element.shadowRoot.querySelector()
        let btn = element.shadowRoot.querySelector('lightning-button');
        let txt = element.shadowRoot.querySelector('p');

        expect(txt.textContent).toBe('Click the button to see my guitarist preference!');

        // We can fire events from the element to simulate events occuring from the user
        btn.dispatchEvent(new CustomEvent('click'));
        /*
            What happens next is that the value in the controller is going to change.
            This signals to the LWC framework that the component needs to re-render.
            This process is ASYNCHRONOUS, so we need to wait for it to complete.
        */
        await Promise.resolve();

        txt = element.shadowRoot.querySelector('p');
        expect(txt.textContent).toBe('Do you really wanna see?');
        btn.dispatchEvent(new CustomEvent('click'));
        await Promise.resolve();

        txt = element.shadowRoot.querySelector('p');
        expect(txt.textContent).toBe('I really like the guitarist Mark Morton.');
        btn.dispatchEvent(new CustomEvent('click'));
        await Promise.resolve();

        txt = element.shadowRoot.querySelector('p');
        expect(txt.textContent).toBe('Click the button to see my guitarist preference!');
    });
});

/*
    Testing Web Components uses the Jest framework and uses Unit Tests
        - Unit Test
            - A test designed to test out ONE thing and ONE thing only
                - EX: Testing to see that a method is run when a button is clicked
                - EX: Attributes populate correctly in a component
            - The idea behind this is:
                - If everything is unit tested, the systems integrity is enhanced but not guaranteed
            - Easy to write and catches defects early and quickly
        - The framework we use to test is called Jest
    
        - Jest
            - Generic JS testing framework (so not unique to LWC)
            - Because of this, it is extensive and complex
            - We won't be going into ALL of the complexity, just the basics
            - Requires some installation:
                - Ensure npm is updated to latest version
                    - npm install -g npm@latest
                - Set up Jes environment
                    - sfdx force:lightning:lwc:test:setup
            - Tests must be written in the __tests__ directory of the component we test
            - Tests should use the componentName.test.js naming convention
            - Jest documentation: https://jestjs.io/docs/getting-started
*/