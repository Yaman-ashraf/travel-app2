// Function to fetch location data from Geonames API
const fetchLocationData = async (location) => {
    try {
        const response = await fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=yaman472001`);

        if (!response.ok) throw new Error('Failed to fetch location data');

        const data = await response.json();
        if (data.geonames.length === 0) throw new Error('No location data found');

        return data.geonames[0];
    } catch (error) {
        console.error("Error fetching location data:", error);
        throw error; // Re-throw the error for handling in the calling function
    }
};

// Function to fetch weather data from Weatherbit API
const fetchWeatherData = async (lat, lon, date) => {
    try {
        const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=ade57310e56d42b9b7d0f2120d4a0f14`);

        if (!response.ok) throw new Error('Failed to fetch weather data');

        const data = await response.json();
        const weather = data.data.find(item => item.datetime === date);

        if (!weather) throw new Error('Weather data not available for the specified date/location');

        return weather;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

// Function to fetch an image from Pixabay API
const fetchImage = async (location) => {
    try {
        const response = await fetch(`https://pixabay.com/api/?key=45722849-78f07298ac4de61c00651e843&q=${encodeURIComponent(location)}&image_type=photo`);

        if (!response.ok) throw new Error('Failed to fetch image data');

        const data = await response.json();

        if (data.hits.length === 0) throw new Error('No images found for this location');

        return data.hits[0].webformatURL;
    } catch (error) {
        console.error("Error fetching image:", error);
        return 'default-image-url.jpg';  // Ensure this is a valid URL
    }
};

// Function to handle form submission
export const handleSubmit = async (event) => {
    event.preventDefault();

    const location = document.getElementById('trip-location').value;
    const date = document.getElementById('trip-date').value;

    if (!location || !date) {
        alert('Please fill in all fields.');
        return;
    }

    try {
        // Fetch location data
        const locationData = await fetchLocationData(location);

        // Fetch weather data
        const weatherData = await fetchWeatherData(locationData.lat, locationData.lng, date);

        // Fetch image data
        const imageUrl = await fetchImage(location);

        // Update the UI with fetched data
        updateUI(location, date, weatherData, imageUrl);

    } catch (error) {
        console.error('Error handling form submission:', error);
        alert(error.message);
    }
};

// Function to update the UI with trip info
export const updateUI = (location, date, weatherData, imageUrl) => {
    document.getElementById('trip-location-display').textContent = `My trip to: ${location}`;
    document.getElementById('departure-date-display').textContent = `Departing: ${new Date(date).toLocaleDateString()}`;
    document.getElementById('high-temp').textContent = `High: ${weatherData.max_temp}°C`;
    document.getElementById('low-temp').textContent = `Low: ${weatherData.min_temp}°C`;
    document.getElementById('weather-description').textContent = weatherData.weather.description;
    document.getElementById('trip-image').src = imageUrl;
    document.getElementById('trip-image').alt = location;

    // Clear the form
    document.getElementById('trip-form').reset();
};


// Helper function to calculate days away
const calculateDaysAway = (date) => {
    const today = new Date();
    const tripDate = new Date(date);
    const differenceInTime = tripDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
};

// Function to save a trip
const saveTrip = () => {
    const location = document.getElementById('trip-location').textContent.split(': ')[1];
    const date = document.getElementById('departure-date').textContent.split(': ')[1];

    const trip = {
        location,
        date,
        highTemp: document.getElementById('high-temp').textContent,
        lowTemp: document.getElementById('low-temp').textContent,
        weatherDescription: document.getElementById('weather-description').textContent,
        image: document.getElementById('trip-image').src
    };

    let trips = JSON.parse(localStorage.getItem('trips')) || [];
    trips.push(trip);
    localStorage.setItem('trips', JSON.stringify(trips));

    alert('Trip saved successfully!');
};

// Function to remove a trip
const removeTrip = (index) => {
    let trips = JSON.parse(localStorage.getItem('trips')) || [];
    trips.splice(index, 1);
    localStorage.setItem('trips', JSON.stringify(trips));
    displaySavedTrips();
    alert('Trip removed successfully!');
};

// Function to display saved trips
const displaySavedTrips = () => {
    const trips = JSON.parse(localStorage.getItem('trips')) || [];
    const tripSection = document.getElementById('saved-trips');
    tripSection.innerHTML = '';

    trips.forEach((trip, index) => {
        const tripDetails = `
            <div>
                <h2>Trip to: ${trip.location}</h2>
                <p>Departing: ${trip.date}</p>
                <p>High: ${trip.highTemp}</p>
                <p>Low: ${trip.lowTemp}</p>
                <p>Weather: ${trip.weatherDescription}</p>
                <img src="${trip.image}" alt="${trip.location}">
                <button onclick="removeTrip(${index})">Remove Trip</button>
            </div>`;
        tripSection.innerHTML += tripDetails;
    });
};

// Initialize event listeners on page load
export const initializeEventListeners = () => {
    document.getElementById('trip-form').addEventListener('submit', handleSubmit);
    document.getElementById('save-trip').addEventListener('click', saveTrip);
    document.getElementById('remove-trip').addEventListener('click', displaySavedTrips); // Ensure trips are displayed
};

document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    displaySavedTrips(); // Display saved trips on page load
});
