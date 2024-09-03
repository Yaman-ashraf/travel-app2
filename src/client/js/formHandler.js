import { checkForName } from './nameChecker.js';

function isValidURL(url) {
    const urlRegex = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.([a-z]{2,}|[a-z\d-]{2,}))|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;
    return urlRegex.test(url);
}

const serverURL = 'https://localhost:8000/api';

// Ensure DOM content is loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('urlForm');

    if (form) {
        form.addEventListener('submit', handleSubmit);
    } else {
        console.error('Form element not found.');
    }
});

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // Check if the URL is valid
    if (isValidURL(formText)) {
        // Send the URL to the server
        fetch(serverURL, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: formText }),
        })
            .then(response => response.json())
            .then(data => updateUI(data))
            .catch(error => console.error('Error:', error));
    } else {
        alert("Please enter a valid URL.");
    }
}

// Function to update the UI with the API response
function updateUI(data) {
    document.getElementById('score_tag').innerText = data.score_tag;
    document.getElementById('irony').innerText = data.irony;
    document.getElementById('agreement').innerText = data.agreement;
}

export { handleSubmit };
