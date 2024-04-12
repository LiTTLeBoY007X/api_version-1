const express = require('express');
const router = express.Router();
const resetFirebaseApp = require('../modul/resetFirebaseApp'); // เรียกใช้งานโมดูล resetFirebaseApp
const admin = require('firebase-admin'); // เพิ่มการนำเข้าโมดูล admin
const multer = require('multer');
const fs = require('fs');
const DBcontent = require('../model/ContentModel')
const { initializeFirebase} = require('../modul/test');

// กำหนดค่า Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', (req, res) =>{
  res.sendFile("index.html", {root: 'public'});
});

router.post('/admin/add', upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    resetFirebaseApp(); // เรียกใช้งานโมดูล resetFirebaseApp เพื่อรีเซ็ตแอป Firebase

    const firebaseApp = admin.app('adminApp');
    const bucket = firebaseApp.storage().bucket();
    var picDB = []
    const uploadPromises = req.files.map(async file => {
      const fileName = `${Date.now()}-${file.originalname}`;
      const fileUpload = bucket.file(fileName);
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      });

      // รอให้ Stream เสร็จสิ้นแล้วอัปโหลดไฟล์
      await new Promise((resolve, reject) => {
        stream.on('error', reject);
        stream.on('finish', resolve);
        stream.end(file.buffer);
      });

      console.log(`File ${fileName} uploaded successfully.`);
      picDB.push(fileName)
    });

    await Promise.all(uploadPromises);


    initializeFirebase();


    // กำหนดชื่อไฟล์ภาพที่ต้องการดึง URL
    const fileNames = picDB; // เปลี่ยนเป็นชื่อไฟล์ที่ต้องการดึง URL

    // กำหนด options สำหรับการรับ URL
    const options = {
      action: 'read', // กำหนดการกระทำเป็น 'read' เพื่อให้สามารถอ่านไฟล์ได้
      expires: '03-17-2025' // กำหนดวันหมดอายุของ URL
    };

    // ใช้ method getSignedUrl เพื่อรับ URL ของไฟล์ภาพแต่ละไฟล์
    const promises = fileNames.map(fileName => {
      return bucket.file(fileName).getSignedUrl(options);
    });
    var pictest = []
    // รวม promises และแสดงผลลัพธ์
    Promise.all(promises)
      .then(urls => {
        urls.forEach((url, index) => {
          pictest.push(url);

        });
        var doc = new DBcontent({
          filename: pictest,
          content: req.body.content,
          templateDB: req.body.val, // ชื่อของไฟล์รูปภาพ/ ข้อความ
          serviceType: req.body.serviceType,
        })
        doc.save()
        .then((data) =>{
          console.log(data)
        })
      })
      .catch(err => {
        console.error('Error getting file URLs:', err);
      });




    
    res.redirect('/');
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).send('Error uploading files');
  }
});







module.exports = router;
