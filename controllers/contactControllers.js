const mongoose = require('mongoose');
const contactSchema = require('../schemas/contactSchema');
const Contact = new mongoose.model('Contact', contactSchema);

const getAllContact = (req, res) => {
    Contact.find()
        .then(contacts => {
            res.render('form', { contacts, error: {} })
        })
        .catch(err => {
            res.json({
                message: "Error occurred!!"
            })
        })
}

const getSingleContact = (req, res) => {
    const { id } = req.params;
    Contact.findById()
        .then(contact => {
            res.json(contact)
        })
        .catch(err => {
            res.json({
                message: "Error occurred!!"
            })
        })
}

const createContact = (req, res) => {
    const { name, phone, email, id } = req.body;

    const error = {};

    if (!name) {
        error.name = "please provide a name"
    }
    if (!phone) {
        error.phone = "please provide a phone"
    }
    if (!email) {
        error.email = "please provide a email"
    }

    let isError = Object.keys(error).length > 0
    if (isError) {
        Contact.find()
            .then(contacts => {
                res.render('form', { contacts, error })
            })
            .catch(err => {
                res.json({
                    message: "Error occurred!!"
                })
            })
        return;
    }

    if (id) {
        Contact.findOneAndUpdate({
            _id: id
        },
            {
                $set: {
                    name,
                    phone,
                    email
                }
            })
            .then(() => {
                Contact.find()
                    .then(contacts => {
                        res.render('form', { contacts, error: {} })
                    })
                    .catch(err => {
                        res.json({
                            message: "Error occurred!!"
                        })
                    })
            })
            .catch(err => {
                res.json({
                    message: err
                })
            })

    } else {
        const contact = new Contact({
            name,
            phone,
            email
        })
        contact.save()
            .then(() => {
                Contact.find()
                    .then(contacts => {
                        return res.render('form', { contacts, error: {} })
                    })
                    .catch(err => {
                        return res.json({
                            message: "Error occurred!!"
                        })
                    })
            })
            .catch(err => {
                return res.json({
                    message: "Error occurred!!"
                })
            })
    }
}

const updateContact = (req, res)=> {
   const {name, phone, email} = req.body;
   const {id} = req.params;

   Contact.findOneAndUpdate(
    {
        _id: id
    },
    {
        $set: {
            name,
            phone, 
            email
        }
    },
    {
        new: true
    })
   .then(contact => {
        // res.json(contact)
        return res.render('form', {contacts: contact, error: {}})
    })
    .catch(err => {
        res.json({
        message: "Error occurred!!"
        })
    })
}

const deleteContact = (req, res) => {
    const { id } = req.params;
    Contact.findOneAndDelete({ _id: id })
        .then(() => {
            Contact.find()
                .then((contacts) => {
                    res.render('form', { contacts, error: {} })
                })
        })
        .catch(err => {
            res.json({
                message: "Error occurred!!"
            })
        })
}


module.exports = {
    getAllContact,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
}