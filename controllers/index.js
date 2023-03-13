const router = require('express').Router();

const { BlogPost } = require('../models');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const blogPostRoutes = require('./blogpost-routes');
const dashboardRoutes = require('./dashboard-routes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/api/blogpost', blogPostRoutes)


module.exports = router;
