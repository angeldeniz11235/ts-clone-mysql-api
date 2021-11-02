const express = require('express')
const router = express.Router()
const staffController = require('../controllers/staff.controller');
// Retrieve all staff members
router.get('/', staffController.findAll);
// Create a new staff
router.post('/', staffController.create);
// Retrieve a single staff with id
router.get('/:id', staffController.findById);
// Update a staff with id
router.put('/:id', staffController.update);
// Delete a staff with id
router.delete('/:id', staffController.delete);
module.exports = router