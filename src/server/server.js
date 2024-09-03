// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Importing dependencies
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// Start up an instance of app
const app = express();

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 5454;
app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});

// Initialize all route with a callback function
app.get('/all', (req, res) => {
    res.send(projectData);
});

// Post Route
app.post('/add', (req, res) => {
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content,
    };
    res.send(projectData);
});

// Root Route
app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

// Export the app for testing
export default app;
