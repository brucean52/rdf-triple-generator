const express = require('express');
const tripleController = require('../controllers/triple');

let router = express.Router();

router.get('/get/:name', tripleController.getTriple);
router.get('/list', tripleController.getTripleList);

router.put('/merge', tripleController.mergeTriple);

router.post('/create', tripleController.createTriple);


module.exports = router;