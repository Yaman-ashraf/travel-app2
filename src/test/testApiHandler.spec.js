import { fetchAnalysis } from '../client/js/apiHandler';

describe("Testing the API handler functionality", () => {
    test("Testing the fetchAnalysis() function", () => {
        expect(fetchAnalysis).toBeDefined();
    });
});
