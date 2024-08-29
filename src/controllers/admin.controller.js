const Person = require('./../models/person.model');

exports.newPage = (req, res) => {
    res.render('admin/new', { person: new Person() });
}

exports.editPage = async (req, res) => {
    const person = await Person.findById(req.params.id);
    res.render('admin/edit', { person: person });
}

exports.adminNew = async (req, res, next) => {
    req.person = new Person();
    next();
}, savePersonAndRedirect();

exports.adminEdit = async (req, res, next) => {
    req.person = await Person.findById(req.params.id);
    next();
}, savePersonAndRedirect();

exports.adminDelete = async (req, res) => {
    await Person.findByIdAndDelete(req.params.id)
    res.redirect('/admin');
}

function savePersonAndRedirect() {
    return async (req, res) => {
        let person = req.person;
        person.name = req.body.name;
        person.workplace = req.body.workplace;
        person.contact = req.body.contact;

        try {
            person = await person.save();
            console.log("Successfully!");
            res.redirect('/admin');
        } catch (error) {
            console.log(error);
        }
    }
}