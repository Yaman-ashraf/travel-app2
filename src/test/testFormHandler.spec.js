// Mock the DOM elements before importing the module to be tested
document.body.innerHTML = `
    <form id="urlForm">
        <input type="text" id="name" value="https://example.com">
        <button type="submit">Submit</button>
    </form>
    <div id="score_tag"></div>
    <div id="irony"></div>
    <div id="agreement"></div>
`;

import { handleSubmit } from '../client/js/formHandler.js';

// Mock the global fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ score_tag: 'P', irony: 'NONIRONIC', agreement: 'AGREEMENT' }),
    })
);

describe('Testing the submit functionality', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Testing the handleSubmit() function', () => {
        const form = document.getElementById('urlForm');
        form.addEventListener('submit', handleSubmit); // Attach the event listener

        // Mock the event object
        const event = { preventDefault: jest.fn() };

        // Call the handleSubmit function manually to test it
        handleSubmit(event);

        // Assertions
        expect(event.preventDefault).toHaveBeenCalled(); // Check that preventDefault was called
        expect(fetch).toHaveBeenCalledTimes(1); // Check that fetch was called
        expect(fetch).toHaveBeenCalledWith(
            'https://localhost:8000/api',
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: "https://example.com" }),
            })
        );
    });
});
