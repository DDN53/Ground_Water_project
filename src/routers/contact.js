const express = require('express');
const router = express.Router();
const contactUsController = require('../controllers/contactUsController');
const upload = require('../middleware/uploadMiddleware');
const RoleAuthMiddleware = require("../middleware/RoleAuthMiddleware");

router.post('/contact', contactUsController.upload, contactUsController.handleFileUpload);

module.exports = router;
