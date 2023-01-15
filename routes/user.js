const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { response } = require('express');


const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required(),
    user_type: Joi.string().valid('mod', 'admin')
});
router.get('/:id', async function(req,res){
    try {
        const sqlQuery = 'SELECT id, email, password, created_at, user_type FROM user WHERE id=?';
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }


    res.status(200).json({id:req.params.id})
});

router.post('/register', async function(req,res) {
    try {
        const {email, password, user_type} = req.body;
        const {error,value} = userSchema.validate(req.body);
        if(error)
        {
            return res.send("Nije dobro popunjen korisnik" + error);
        }
        const encryptedPassword = await bcrypt.hash(password,10)

        const sqlQuery = 'INSERT INTO user (email, password,user_type) VALUES (?,?,?)';
        const result = await pool.query(sqlQuery, [email, encryptedPassword, user_type]);

        res.status(200).json("Poslato");

    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/login', async function(req,res) {
    try {
        const {email,password} = req.body;

        const sqlGetUser = 'SELECT password, id, user_type FROM user WHERE email=?';
        const rows = await pool.query(sqlGetUser,email);
        if(rows){
            id = rows[0].id;
            user_type = rows[0].user_type;
            const isValid = await bcrypt.compare(password,rows[0].password)
            token = jwt.sign(user_type+id,"KristinaVoliNikolu");
                
            res.status(200).json({token: token, id: rows[0].id, user_type: user_type});
        }
        res.status(200).send(`User with email ${email} was not found`);
    } catch (error) { 
        
    }
})
router.patch('/:id', async function(req,res) {
    const user_id = req.params.id;
    token = req.body.token;
    const {error,value} = userSchema.validate({email :req.body.email, password: req.body.password, user_type : req.body.user_type});
        if(error)
        {
            return res.send("Nije dobro popunjen korisnik" + error);
        }
    const sqlQuery = "UPDATE user SET email=?, user_type=?, password =? WHERE id=?";
    rez = jwt.verify(token,"KristinaVoliNikolu")
    if(rez.includes("mod"))
        return res.send("Vi ste moderator, nemate prava za ovu akciju")
    const encryptedPassword = await bcrypt.hash(req.body.password,10)
    const result = await pool.query(sqlQuery, [req.body.email, req.body.user_type, encryptedPassword, user_id]);
    return res.send("Uspeh")

})

module.exports = router;