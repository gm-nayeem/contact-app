const express = require('express');
const { 
    getAllContact, 
    //getSingleContact, 
    createContact, 
    //updateContact, 
    deleteContact  
} = require('../controllers/contactControllers');

const router = express.Router();

router.get('/', getAllContact);
// router.get('/:id', getSingleContact); //use for postman
router.get('/delete/:id', deleteContact);
router.post('/', createContact); //use for postman
// router.put('/:id', updateContact); //use for postman
// router.delete('/:id', deleteContact); //use for postman


module.exports = router;