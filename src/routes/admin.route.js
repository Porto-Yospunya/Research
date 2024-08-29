const express = require('express');

const router = express.Router();

const adminController = require('./../controllers/admin.controller');
const { validateToken } = require('./../middleware/auth');

router.get("/new", validateToken, adminController.newPage);

router.get("/edit", validateToken, adminController.editPage);

router.post("/", validateToken, adminController.adminNew);

router.put("/:id", validateToken, adminController.adminEdit);

router.delete("/:id", validateToken, adminController.adminDelete);

module.exports = router;