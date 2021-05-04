import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router();

router.route('/register').post((req, res) => {
    let { username, password, password2 } = req.body;
    if (password !== password2) {
        res.json({ passwordsNotMatching: true });
    } else {
        User.findOne({ username: username })
            .then(user => {
                if (!user) {
                    password = bcrypt.hashSync(password, 10);
                    const newUser = new User({ username, password });
                    req.session.user = newUser;
                    newUser.save()
                        .then(() => res.json('User registered'))
                        .catch(err => res.status(400).json(err));
                } else {
                    res.json({ userAlreadyExists: true });
                }
            })
            .catch(err => res.status(400).json(err));
    }
});

router.route('/login').post((req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username })
        .then(user => {
            if (!user) {
                res.json({ loginSuccessful: false });
            } else {
                const isCorrectPassword = bcrypt.compareSync(password, user.password);
                if (isCorrectPassword) {
                    req.session.user = user;
                    res.json({ loginSuccessful: true });
                } else {
                    res.json({ loginSuccessful: false });
                }
            }
        })
        .catch(err => res.status(400).json(err));
});

router.route('/login').get((req, res) => {
    if (req.session.user) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
});

router.route('/logout').post((req, res) => {
    req.session.destroy();
    res.json('User logged out');
});

export default router;