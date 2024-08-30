const Person = require('./../models/person.model');

exports.newPage = (req, res) => {
    res.render('admin/new', { person: new Person() });
}

exports.editPage = async (req, res) => {
    const person = await Person.findById(req.params.id);
    res.render('admin/edit', { person: person });
}

exports.adminNew = async (req, res) => {
    req.person = new Person();
    let person = req.person;
    person.name = req.body.name;
    person.workplace = req.body.workplace;
    person.contact = req.body.contact;
    

    try {
        if (!req.workplace) {
            // person.workplace = "none";
        }
        if (!req.contact) {
            // person.contact = "none";
        }

        if (!req.file) {
            console.log("Failed!");
        }
        person.image = req.file.path;
        
        person = await person.save();
        console.log("Successfully!");
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }

    console.log("New successfully!");
}

exports.adminEdit = async (req, res) => {
    req.person = await Person.findById(req.params.id);
    let person = req.person;
    person.name = req.body.name;
    person.workplace = req.body.workplace;
    person.contact = req.body.contact;
    
    try {
        if (!req.workplace) {
            // person.workplace = "none";
        }
        if (!req.contact) {
            // person.contact = "none";
        }

        if (!req.file) {
            console.log("Failed!")
        }
        person.image = req.file.path;
        console.log(person.image);

        person = await person.save();
        console.log("Successfully!");
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }

    console.log("Edit successfully!");
}

exports.adminDelete = async (req, res) => {
    await Person.findByIdAndDelete(req.params.id);
    console.log("Delete successfully!");
    res.redirect('/admin');
}