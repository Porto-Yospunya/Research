require('dotenv').config();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const Person = require('./../models/person.model');

const User = require('../models/user.model');

exports.registPage = (req, res) => {
    res.render('user/register');
}

exports.loginPage = (req, res) => {
    res.render('user/login', { messages: req.flash("error") });
}

exports.newPage = (req, res) => {
    res.render('user/new', { person: new Person(), isNew: true });
}

exports.userSearch = async (req, res) => {
    try {
        const { name } = req.body;
        const personAll = await Person.find();
        const person = await Person.find({ name: name });
        
        !name ? res.render('user/home', { persons: personAll }) : res.render('user/home', { persons: person });
    } catch (error) {
        
    }
}

exports.userNew = async (req, res) => {
    try {
        const { name, workplace, contact } = req.body;
        
        await Person.create({
            name: name,
            workplace: workplace,
            contact: contact,
        });

        console.log("Successfully!");
        res.redirect('/user');
    } catch (error) {
        console.log(error);
    }

    console.log("New successfully!");
}

exports.userSignIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
                res.cookie("token", token);

                console.log("Login is successfully!");
                res.redirect('/admin');
            } else {
                req.flash("error", "Incorrect password.");
                res.redirect('/user/sign-in');
            }
        } else {
            req.flash("error", "User not found.");
            res.redirect('/user/sign-in');
        }
    } catch (error) {
        console.log("Login is failed.");
        console.log(error);

        req.flash("error", "Login is failed.");
        res.redirect('/user/sign-in');
    }
}

exports.userSignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body.username);
        if (!username || !email || !password) {
            res.status(400).json({ message: "All fields are required." });
        }

        const existUserCheck = await User.findOne({ email: req.body.email });
        if (existUserCheck) {
            res.status(400).json({ message: "Email already exists." });
        }

        const user = await User.create({
            username,
            email,
            password
        });

        const token = jwt.sign({ id: user._id, email: user.email, }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token);

        console.log("Register is successfully!");
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }
}

exports.useSignOut = (req, res) => {
    res.cookie("token", "", { maxAge: 1 });
    console.log("Log Out.");
    res.redirect("/user");
};
