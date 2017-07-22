const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {}), (req, res) => {
    res.status(204).send()
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {}), (req, res) => {
    res.status(204).send()
});

router.get('/logout', ensureLoggedIn(), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
