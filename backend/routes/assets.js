const express = require('express');

const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');

const AssetsController = require('../controllers/assets');

const router = express.Router();

router.post("", extractFile, AssetsController.createAsset);

router.get("", AssetsController.getAssetsByType);

router.get("/:id", AssetsController.getAssetById);

router.delete("/:id", AssetsController.deleteAsset);

module.exports = router;

