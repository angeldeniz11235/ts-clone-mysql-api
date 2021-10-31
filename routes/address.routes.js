const express = require('express')
const router = express.Router()
const addressController = require('../controllers/address.controller');
// Retrieve all addresses
router.get('/', addressController.findAll);
// Create a new address
router.post('/', addressController.create);
// Retrieve a single address with id
router.get('/:id', addressController.findById);
// Update a address with id
router.put('/:id', addressController.update);
// Delete a address with id
router.delete('/:id', addressController.delete);
module.exports = router