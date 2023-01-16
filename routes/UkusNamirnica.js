const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { response } = require('express');
const NamirnicaUkusSchema = Joi.object({
    Ukus_id: Joi.number(),
    Namirnica_id: Joi.number()
});

router.get('/', async function(req,res){
    try {
        const sqlQuery = 'SELECT * FROM NamirnicaUkus';
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
});
router.post('/', async function(req,res) {
    try {
        body = req.body
        const {error,value} = NamirnicaUkusSchema.validate(req.body);
        NamirnicaId= body.NamirnicaId
        ListaId = body.ListaId
        if(error)
        {
            return res.send("Nisu dobro popunjeni parametri" + error);
        }
        const sqlQuery = 'INSERT INTO NamirnicaUkus (Ukus_id, Namirnica_id) VALUES (?,?)';
        const result = await pool.query(sqlQuery, [Ukus_id, Namirnica_id]);

        res.status(200).json("Poslato");

    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.delete('/', async function(req,res) {
    const Ukus_id = req.body.Ukus_id;
    const Namirnica_id = req.body.Namirnica_id;
    const sqlQuery = "DELETE FROM NamirnicaUkus WHERE Namirnica_id=?, Ukus_id=?;";
    const result = await pool.query(sqlQuery, [id]);
    return res.send("Uspeh")
})







module.exports = router;