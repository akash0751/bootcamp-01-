const axios = require('axios');

const GEMINI_API_KEY = 'AIzaSyC7b6w-az5D3iPlLZ3vRXwpvUtkdhqlQUk';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY;


const apiDescription = `
Create API documentation for an Express.js server with the following endpoint:
GET / - Returns { "message": "Hello World" }
`;

async function generateDocumentation() {
  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{ parts: [{ text: apiDescription }] }]
    });

    const generatedDocs = response.data.candidates[0]?.content?.parts[0]?.text;
    console.log('📄 Generated Documentation:\n', generatedDocs);
  } catch (error) {
    console.error('❌ Error generating documentation:', error.response?.data || error.message);
  }
}

generateDocumentation();
