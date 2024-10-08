import request from 'supertest';
import app from '../server/server.js'; // Adjust path as needed

let server;

beforeAll((done) => {
    console.log = jest.fn(); // Suppress console logs
    server = app.listen(5454, () => {
        done();
    });
}, 10000);

afterAll((done) => {
    if (server) {
        server.close(done);
    } else {
        done(); // If no server, call done immediately
    }
});

describe('Test the root path', () => {
    test('It should respond with the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});
