const express = require('express')
const router = express.Router()
const leagueController = require('../controllers/league.controller');
// Retrieve all leagues
router.get('/', leagueController.findAll);
// Create a new league
router.post('/', leagueController.create);
// Retrieve a single league with id
router.get('/:id', leagueController.findById);
// Update a league with id
router.put('/:id', leagueController.update);
// Delete a league with id
router.delete('/:id', leagueController.delete);
module.exports = router