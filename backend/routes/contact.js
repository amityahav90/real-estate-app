const express = require('express');

const ContactController = require('../controllers/contact');

const router = express.Router();

router.post("", ContactController.createContact);

router.get("", ContactController.getAllMessages);

router.delete("/:id", ContactController.deleteMessage);

router.post("/review", ContactController.createReview);

module.exports = router;
