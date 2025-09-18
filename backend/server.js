const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const scheduleStudentSync = require('./cron/syncJob');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/studentProgress', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/api/students', studentRoutes);

// Start Cron Job
scheduleStudentSync(); // Starts syncing at 2 AM daily

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
