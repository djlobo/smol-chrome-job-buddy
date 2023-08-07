```javascript
document.addEventListener('DOMContentLoaded', function() {
    let selectedResume;
    let jobDescription;
    let generatedCoverLetter;
    let modifiedCoverLetter;
    let applicationData;

    document.getElementById('resumeUpload').addEventListener('change', function(e) {
        selectedResume = e.target.files[0];
    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.message === 'SEND_JOB_DESCRIPTION') {
            jobDescription = request.data;
            document.getElementById('jobDescriptionInput').value = jobDescription;
        }
    });

    document.getElementById('generateCoverLetter').addEventListener('click', function() {
        chrome.runtime.sendMessage({
            message: 'GENERATE_COVER_LETTER',
            data: {
                resume: selectedResume,
                jobDescription: jobDescription
            }
        }, function(response) {
            generatedCoverLetter = response.data;
            document.getElementById('coverLetterPopup').innerText = generatedCoverLetter;
        });
    });

    document.getElementById('editCoverLetter').addEventListener('click', function() {
        modifiedCoverLetter = document.getElementById('coverLetterTextArea').value;
    });

    document.getElementById('applicationSubmit').addEventListener('click', function() {
        applicationData = {
            resumeFilename: selectedResume.name,
            jobDescription: jobDescription,
            generatedCoverLetter: generatedCoverLetter,
            modifiedCoverLetter: modifiedCoverLetter,
            dateOfApplication: new Date()
        };

        chrome.runtime.sendMessage({
            message: 'STORE_APPLICATION_DATA',
            data: applicationData
        });
    });
});
```