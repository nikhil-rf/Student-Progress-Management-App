const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Student CRUD
router.get('/', studentController.getAllStudents);
router.post('/', studentController.addStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

// Detailed Profile View
router.get('/:id', studentController.getStudentDetails);

module.exports = router;
