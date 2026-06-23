const express = require('express');
const router = express.Router();
// Double check the spelling of zitController:
const { createZit, getAllZits } = require('../controllers/zitController'); 

router.post('/', createZit);
router.get('/', getAllZits);

module.exports = router; // Essential line