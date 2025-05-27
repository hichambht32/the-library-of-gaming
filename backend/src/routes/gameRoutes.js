const express = require('express');
const { getAllGames, getGameById, createGame } = require('../controllers/gameController');
const router = express.Router();

router.get('/', getAllGames);
router.get('/:id', getGameById);
router.post('/', createGame);

module.exports = router;