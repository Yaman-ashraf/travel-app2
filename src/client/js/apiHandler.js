export async function fetchAnalysis(text) {
    const response = await fetch('http://localhost:8080/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    });
    return response.json();
}
