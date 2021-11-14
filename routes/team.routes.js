const express = require('express')
const router = express.Router()
const teamController = require('../controllers/team.controller');
// Retrieve all teams
router.get('/', teamController.findAll);
// Create a new team
router.post('/', teamController.create);
// Retreive all players of a team using teamId as parameter
router.get('/get-all-players/:team_id', teamController.findPlayers);
// Retrieve a single team with id
router.get('/:id', teamController.findById);
// Update a team with id
router.put('/:id', teamController.update);
// Delete a team with id
router.delete('/:id', teamController.delete);
module.exports = router