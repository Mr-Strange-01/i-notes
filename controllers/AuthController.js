const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const register = async function (req, res) {
    try {
        const body = req.body;

        // if (!body.email || !body.password) {
        //     return res.status(400).send('Email and password are required');
        // }

        // if (body.password !== body.confirmPassword) {
        //     return res.status(400).send('Passwords do not match');
        // }

        // if (body.password.length < 6) {
        //     return res.status(400).send('Password must be at least 6 characters');
        // }

        // const existingUser = await User.findOne({email: body.email});
        // if (existingUser) {
        //     return res.status(400).send('User already exists');
        // }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const name = body.name;
        const email = body.email;
        const password = body.password;

        const user = new User({
            name,
            email,
            password
        });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    register
}