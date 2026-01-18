export async function askGemini(prompt, context = null) {
    const response = await fetch('http://localhost:3000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, context })
    });
    const data = await response.json();
    return data.response;
}