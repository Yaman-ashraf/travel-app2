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

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Yaman-ashraf/travel-app
    cd travel-app
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Build the project**:

    Webpack is used to bundle the client-side code. Run the following command to build the project:

    ```bash
    npm run build-prod
    ```

4. **Start the server**:

    Run the following command to start the Express server:

    ```bash
    npm start
    ```

    The server will be running on `http://localhost:5454`.

## Development

To start the development server with hot reloading, use:

    ```bash
    npm run build-dev
    ```

## Testing

To run tests, use:

    ```bash
    npm test
    ```
