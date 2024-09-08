# travel-app2

A custom travel app that integrates data from multiple APIs to provide weather information, location details, and travel-related images. This project uses Node.js, Express, Webpack, and various APIs.

## Project Structure

-   `src/`
    -   `client/`: Contains the client-side code including JavaScript, HTML, and CSS files.
    -   `server/`: Contains the server-side code and configuration.
-   `dist/`: The output directory for Webpack bundles.
-   `package.json`: Contains project metadata and dependencies.

## Features

-   **Weather Information**: Fetches weather data using the Weatherbit API.
-   **Location Details**: Retrieves location information using the Geonames API.
-   **Travel Images**: Provides images related to the travel destination using the Pixabay API.

## API Credentials

To run this project, you will need to add your own API credentials for the Geonames, Weatherbit, and Pixabay APIs.

-   **Geonames API**: Replace the `username` in the `fetchLocationData` function in `src/client/js/app.js` with your own Geonames username.
-   **Weatherbit API**: Replace the `key` in the `fetchWeatherData` function in `src/client/js/app.js` with your Weatherbit API key.
-   **Pixabay API**: Replace the `key` in the `fetchImage` function in `src/client/js/app.js` with your Pixabay API key.

## Node.js Version

This project requires Node.js version **20.10.0**.
To ensure:

    nvm use 20.10.0


## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Yaman-ashraf/travel-app2
    cd travel-app
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Build the project**:

    ```bash
    npm run build-prod
    ```

4. **Start the server**:

    ```bash
    npm start
    ```

    The server will be running on `http://localhost:5454`.

## Development

    npm run build-dev

## Testing

    npm test
