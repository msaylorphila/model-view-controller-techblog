const router = require('express').Router();
// const { User, Comment, BlogPost } = require('/models/index');

router.get('/', async (req, res) => {
    try {
       res.render('homepage', {name: 'Marg'}) 
    } catch(err) {
        console.log('you messed up')
    }
});



module.exports = router