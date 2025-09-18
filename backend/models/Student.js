const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  cf_handle: { type: String, required: true },
  current_rating: { type: Number, default: 0 },
  max_rating: { type: Number, default: 0 },
  last_synced: { type: Date, default: Date.now },
  reminder_count: { type: Number, default: 0 },
  auto_email_enabled: { type: Boolean, default: true }
});

module.exports = mongoose.model('Student', StudentSchema);
