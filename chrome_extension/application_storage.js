```javascript
let applicationData = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "STORE_APPLICATION_DATA") {
    applicationData = request.data;
    storeApplicationData();
  }
});

function storeApplicationData() {
  const dbRequest = indexedDB.open("ApplicationDatabase", 1);

  dbRequest.onerror = function(event) {
    console.log("Error opening database");
  };

  dbRequest.onupgradeneeded = function(event) {
    const db = event.target.result;
    const objectStore = db.createObjectStore("applications", { autoIncrement: true });

    objectStore.createIndex("resumeFilename", "resumeFilename", { unique: false });
    objectStore.createIndex("companyNameUrl", "companyNameUrl", { unique: false });
    objectStore.createIndex("jobDescription", "jobDescription", { unique: false });
    objectStore.createIndex("generatedCoverLetter", "generatedCoverLetter", { unique: false });
    objectStore.createIndex("modifiedCoverLetter", "modifiedCoverLetter", { unique: false });
    objectStore.createIndex("dateOfApplication", "dateOfApplication", { unique: false });
  };

  dbRequest.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(["applications"], "readwrite");
    const objectStore = transaction.objectStore("applications");

    const request = objectStore.add(applicationData);

    request.onsuccess = function(event) {
      console.log("Application data stored successfully");
    };

    request.onerror = function(event) {
      console.log("Error storing application data");
    };
  };
}
```