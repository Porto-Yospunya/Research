const Person = require('./../models/person.model');

exports.editPage = async (req, res) => {
    const person = await Person.findById(req.params.id);
    res.render('admin/edit', { person: person });
}

exports.newPage = (req, res) => {
    res.render('admin/new', { person: new Person() });
}

exports.adminNew = async (req, res) => {
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
        res.render('components/error', { error: error });
    }
}

exports.adminEdit = async (req, res) => { 
    try {
        const { name, workplace, contact } = req.body;
        
        await Person.findByIdAndUpdate(req.params.id, {
            name: name,
            workplace: workplace,
            contact: contact,
        });
        console.log("Edit successfully!");
        res.redirect('/user');
    } catch (error) {
        res.render('components/error', { error: error });
    }

    
}

exports.adminDelete = async (req, res) => {
    try {
        await Person.findByIdAndDelete(req.params.id);
        console.log("Delete successfully!");
        res.redirect('/user');
    } catch (error) {
        res.render('components/error', { error: error });
    }
}