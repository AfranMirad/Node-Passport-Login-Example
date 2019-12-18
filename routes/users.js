const express = require('express');
const router = express.Router();

//User Model
const User = require('../models/User');

//Login Page
router.get('/login', (req, res) => res.render('login'));

//Register Page
router.get('/register', (req, res) => res.render('register'));

//Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Lütfen alanları boş geçmeyiniz' });
    }

    //Check passwords march
    if (password !== password2) {
        errors.push({ msg: 'Şifreler uyuşmamaktadır.' });
    }

    //Check pass length
    if (password < 6) {
        errors.push({ msg: 'Şifre 6 karakterden kısa olmamalıdır.' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        //Validation passed
        User.findOne({ email: email })
    }
});

module.exports = router;