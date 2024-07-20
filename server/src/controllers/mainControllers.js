const { createUser, findUserByEmail } = require('../services/user')
const User=require('../models/Registration')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.jwtSecret;

const signupUser = async (req, res) => {
    const data = req.body;
    let token = null;

    try {
        // Hash the password before saving the user
        data.password = bcrypt.hashSync(data.password, 8);
        const user = await createUser(data);

        if (user.email) {
            // Generate JWT token
            token = jwt.sign({ email: user.email }, jwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(201).send({ token: token, email: user.email, msg: 'Successfully signed up' });
        } else {
            res.status(400).send({ token: token, msg: 'Could not sign up', error: user });
        }
    } catch (e) {
        res.status(500).send({ token: token, msg: 'Could not sign up', error: e.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ msg: 'Email and password are required.' });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).send({ msg: 'User not found.' });
        }

        const authenticated = bcrypt.compareSync(password, user.password);
        if (authenticated) {
            const token = jwt.sign({ email: user.email }, jwtSecret, {
                expiresIn: '24h' // expires in 24 hours
            });

            res.status(200).send({ msg: 'Login successful.', token });
        } else {
            res.status(403).send({ msg: 'Incorrect email or password.' });
        }
    } catch (error) {
        console.error('Login error:', error); // Log the error
        res.status(500).send({ msg: 'An error occurred while processing your request.' });
    }
};

module.exports={
    loginUser,
    signupUser
}