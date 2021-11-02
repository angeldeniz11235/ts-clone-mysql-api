const express = require('express')
const router = express.Router()
const personController = require('../controllers/person.controller');
// Retrieve all persons
router.get('/', personController.findAll);
// Create a new person
router.post('/', personController.create);
// Retrieve a single person with id
router.get('/:id', personController.findById);
// Update a person with id
router.put('/:id', personController.update);
// Delete a person with id
router.delete('/:id', personController.delete);
module.exports = router