// resetFirebaseApp.js
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json')

const resetFirebaseApp = () => {
  // ลบแอป Firebase ที่มีชื่อเรียกว่า 'adminApp' หากมีอยู่
  if (admin.apps.length > 0) {
    admin.app('adminApp').delete()
      .then(() => {
        console.log('Firebase app deleted successfully.');
      })
      .catch(error => {
        console.error('Error deleting Firebase app:', error);
      });
  }

  // สร้างแอป Firebase ใหม่
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://apipicture-907d9.appspot.com'
  }, 'adminApp');

  console.log('Firebase app re-initialized successfully.');
};

module.exports = resetFirebaseApp;