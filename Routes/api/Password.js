const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const Password = require('../../Models/Password');
const validator = require('../../validations/PasswordValidations');
const { string } = require('joi');

//creation
router.post('/', async (req,res) => {
    try {
        // validate request data
        const isValidated = validator.createSchema.validate(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

        // request data
        const { FQDN, username, password } = req.body;

        // Hashing the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        current_date = new Date();

        // add new password
        const newPassword = new Password({
			FQDN ,
            username,
            password : hashedPassword,
            creation_date: new Date(),
            expiration_date: new Date(current_date.setMonth(current_date.getMonth()+3)),
        });
        
        await Password.create(newPassword) 
        res.json({msg:'Password is created successfully', data: newPassword})
    }
    catch(error) {
        console.log(error)
    }  
 })
 
//get all passwords
router.get('/', async (req,res) => {
    const passwords = await Password.find()
    res.json({data: passwords})
})

//search
router.get('/', async (req,res) => {
    const all_passwords = await Password.find()

    const filters = req.query;
    const passwords = all_passwords.filter(password => {
        let isValid = true;
        for (key in filters) {
            isValid = isValid && password[key].includes(filters[key]);
        }
        return isValid;
    });
    res.json({data: passwords});
})


//get specific password
router.get('/:id', async (req,res) => {    
    try {
        const id = req.params.id
        const passwordneeded = await Password.findOne({id})

        if(!passwordneeded) 
            return res.status(404).send({error: 'password does not exist'})

        res.json({data: passwordneeded})
    }
    catch(error) {
        console.log(error)
    } 
})

//deletion
router.delete('/:id', async (req,res) => {
    try {
        const id = req.params.id
        const passwordneeded = await Password.findOne({id})
        if(!passwordneeded) return res.status(404).send({error: 'password does not exist'})
        const deleted = await Password.deleteOne(passwordneeded)
        const passwords = await Password.find()
        
        res.json({msg:'password was deleted successfully', data: passwords})
    }
    catch(error) {
        console.log(error)
    }  
 })

//update 
router.put('/:id', async (req,res) => {
    try {
        const id = req.params.id

        // search for password
        const passwordneeded = await Password.findOne({id})
        if(!passwordneeded) return res.status(404).send({error: 'password does not exist'})

        // validate data
        const isValidated = validator.updateSchema.validate(req.body)
        if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

        if(req.body.hasOwnProperty("password")){
            // Hashing the password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hashedPassword;
        }
            
        current_date = new Date();
        req.body.update_date     = new Date();
        req.body.expiration_date = new Date(current_date.setMonth(current_date.getMonth()+3));

        const updated = await Password.updateOne(passwordneeded, req.body)

        const updated_password = await Password.findOne({id})
        res.json({msg: 'password updated successfully', data: updated_password})
    }
    catch(error) {
        console.log(error)
    }  
 })

module.exports = router;