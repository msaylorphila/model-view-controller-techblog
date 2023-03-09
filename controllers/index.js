const router = require('express').Router();

const { BlogPost } = require('../models');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const blogPostRoutes = require('./blogpost-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/api/blogpost', blogPostRoutes)

module.exports = router;
