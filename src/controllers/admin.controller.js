const Person = require('./../models/person.model');

exports.editPage = async (req, res) => {
    const person = await Person.findById(req.params.id);
    res.render('admin/edit', { person: person });
}

exports.adminEdit = async (req, res) => { 
    try {
        const { name, workplace, contact } = req.body;

        await Person.findByIdAndUpdate(req.params.id, {
            name: name,
            workplace: workplace,
            contact: contact
        });

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