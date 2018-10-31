const express = require('express');

const ContactController = require('../controllers/contact');

const router = express.Router();

router.post("", ContactController.createContact);

router.get("", ContactController.getAllMessages);

module.exports = router;
