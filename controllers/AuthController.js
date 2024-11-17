const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const JWT_SECRET = "@admin";

const register = async function (req, res) {
    try {
        const body = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const securePass = await bcrypt.hash(body.password, salt);

        const name = body.name;
        const email = body.email;
        const password = securePass;

        const user = new User({
            name,
            email,
            password
        });
        await user.save();

        const data = { id: user._id };
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(authToken);
        
        res.status(201).send({authToken});
    } catch (error) {
        res.status(500).send(error);
    }
}

const login = async function (req, res) {
    var body = req.body;
    var user = await User.findOne({ email: body.email });

   try 
   {
        if (!user) {
            res.status(404).send('Please login with correct credentials');
        } else {
            if (bcrypt.compare(body.password, user.password)) {
                const payload = {
                    user: {
                        id: user._id,
                    }
                }
                const authToken = jwt.sign(payload, JWT_SECRET);
                res.status(200).send({authToken});
            } else {            
                res.status(401).send('Invalid password');
            }
        }
   }
   catch (error) {
       res.status(500).send(error);
   }
}


const fetchUser = async function (req, res) {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    register,
    login,
    fetchUser,
}