import OpenAI from 'openai';

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
    dangerouslyAllowBrowser: true,
    defaultHeaders: {
        "HTTP-Referer": window.location.origin,
        "X-Title": "Urban Life Optimizer",
    }
});

/**
 * Call Gemini and print response to console
 * @param {string} prompt - Your question
 * @param {Object} [jsonContext] - Optional JSON context
 */
export async function askGemini(prompt, jsonContext = null) {
    try {
        let userMessage = prompt;

        // If JSON context provided, add it to the prompt
        if (jsonContext) {
            const contextStr = JSON.stringify(jsonContext, null, 2);
            userMessage = `Context (JSON data):\n\`\`\`json\n${contextStr}\n\`\`\`\n\nQuestion: ${prompt}`;
        }

        console.log('Sending to Gemini:', prompt);

        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.0-flash-001",
            messages: [
                {
                    role: "user",
                    content: userMessage
                }
            ],
            temperature: 0.7,
        });

        const response = completion.choices[0].message.content;

        console.log('\n=== GEMINI RESPONSE ===');
        console.log(response);
        console.log('======================\n');

        return response;

    } catch (error) {
        console.error("❌ Gemini API error:", error.message);
        throw error;
    }
}