```javascript
const axios = require('axios');

let generatedCoverLetter = '';

function generateCoverLetter(selectedResume, jobDescription) {
  const LLM_API_URL = 'https://api.llm.com/generate'; // Replace with actual LLM API URL

  const data = {
    resume: selectedResume,
    jobDescription: jobDescription
  };

  axios.post(LLM_API_URL, data)
    .then(response => {
      generatedCoverLetter = response.data.coverLetter;
      chrome.runtime.sendMessage({type: "GENERATE_COVER_LETTER", coverLetter: generatedCoverLetter});
    })
    .catch(error => {
      console.error('Error generating cover letter:', error);
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "SEND_JOB_DESCRIPTION") {
    generateCoverLetter(request.selectedResume, request.jobDescription);
  }
});
```