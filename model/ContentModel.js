const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContentInputSchema = new Schema({
    filename: { type: Array, required: true },
    content: { type: String, required: true },
    templateDB: { type: String }, // ชื่อของไฟล์รูปภาพ/ ข้อความ
    serviceType: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});

const Content = mongoose.model("Content", ContentInputSchema);

module.exports = Content;