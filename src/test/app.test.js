// src/client/js/app.test.js
import { handleSubmit, initializeEventListeners } from '../client/js/app';

beforeEach(() => {
    // Setup DOM elements
    document.body.innerHTML = `
        <form id="trip-form">
            <input id="trip-location" type="text">
            <input id="trip-date" type="text">
        </form>
        <div id="location"></div>
        <div id="departure-date"></div>
        <div id="days-away"></div>
        <div id="high-temp"></div>
        <div id="low-temp"></div>
        <div id="weather-description"></div>
        <button id="save-trip"></button>
        <button id="remove-trip"></button>
    `;

    initializeEventListeners();
});

test('handleSubmit should be defined', () => {
    expect(handleSubmit).toBeDefined();
});
