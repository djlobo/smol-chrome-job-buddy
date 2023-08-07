```javascript
// Importing IndexedDB Promised library for easier handling of IndexedDB
import idb from 'idb';

// Creating and opening a new database
const dbPromise = idb.open('applicationDatabase', 1, upgradeDB => {
  switch (upgradeDB.oldVersion) {
    case 0:
      upgradeDB.createObjectStore('applications', {keyPath: 'id', autoIncrement: true});
  }
});

// Function to store application data
function storeApplicationData(applicationData) {
  return dbPromise.then(db => {
    const tx = db.transaction('applications', 'readwrite');
    tx.objectStore('applications').put(applicationData);
    return tx.complete;
  });
}

// Function to get all application data
function getAllApplicationData() {
  return dbPromise.then(db => {
    return db.transaction('applications')
      .objectStore('applications').getAll();
  });
}

// Exporting the functions
export { storeApplicationData, getAllApplicationData };
```