```javascript
let selectedResume;

document.getElementById('resumeUpload').addEventListener('change', uploadResume);

function uploadResume(event) {
    let file = event.target.files[0];
    if (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        selectedResume = file;
    } else {
        alert("Invalid file type. Please upload a PDF or DOC file.");
    }
}
```