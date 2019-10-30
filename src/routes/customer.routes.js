'use strict'

const express = require('express');
const controller = require('../controllers/customer.controller');
const router = express.Router();
const authService = require('../services/auth.service')

router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
router.post('/refresh-token', authService.authorize, controller.refreshToken);

module.exports = router;