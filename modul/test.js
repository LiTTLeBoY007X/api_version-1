const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json')

let initialized = false;

const initializeFirebase = () => {
  if (!initialized) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'gs://api-store-aa96b.appspot.com' // ปรับเป็น URL ของ Firebase Storage bucket ของคุณ
    });
    initialized = true;
  }
};

const resetFirebaseApp = () => {
  if (initialized) {
    admin.app().delete()
      .then(() => {
        console.log('Firebase app deleted successfully.');
        initialized = false;
      })
      .catch(error => {
        console.error('Error deleting Firebase app:', error);
      });
  }
};

module.exports = { initializeFirebase, resetFirebaseApp };
