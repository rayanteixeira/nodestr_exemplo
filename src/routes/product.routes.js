'use strict'

const express = require('express');
const controller = require('../controllers/product.controller');
const authService = require('../services/auth.service')
const router = express.Router();

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/tags/:tag', controller.getByTag);
router.post('/', authService.isAdmin, controller.post);
router.put('/:id', authService.isAdmin, controller.put);
router.delete('/', authService.isAdmin, controller.delete);

module.exports = router;