const express = require('express');

const router = express.Router();
const adminController = require('./../controllers/admin.controller');
const { validateToken } = require('./../middleware/auth');

router.get("/edit/:id", validateToken, adminController.editPage);

router.put("/home/:id", validateToken, adminController.adminEdit);

router.delete("/home/:id", validateToken, adminController.adminDelete);

module.exports = router;