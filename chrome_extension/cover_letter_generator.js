```javascript
import { LLM_API } from './LLM_API.js';

let selectedResume = null;
let jobDescription = null;
let generatedCoverLetter = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'GENERATE_COVER_LETTER') {
    selectedResume = request.selectedResume;
    jobDescription = request.jobDescription;
    generateCoverLetter();
  }
});

function generateCoverLetter() {
  const prompt = `Generate a cover letter for the following job description: ${jobDescription}. The resume details are as follows: ${selectedResume}`;
  
  LLM_API.generate(prompt)
    .then(response => {
      generatedCoverLetter = response;
      chrome.runtime.sendMessage({message: 'COVER_LETTER_GENERATED', coverLetter: generatedCoverLetter});
    })
    .catch(error => console.error('Error generating cover letter:', error));
}
```