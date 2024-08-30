const express = require('express');

const router = express.Router();
const adminController = require('./../controllers/admin.controller');
const { validateToken } = require('./../middleware/auth');
const upload = require('./../config/uploadImage');

router.get("/new", validateToken, adminController.newPage);

router.get("/edit/:id", validateToken, adminController.editPage);

router.post("/home", validateToken, upload.single('image'), adminController.adminNew);

router.put("/home/:id", validateToken, upload.single('image'), adminController.adminEdit);

router.delete("/home/:id", validateToken, adminController.adminDelete);

module.exports = router;