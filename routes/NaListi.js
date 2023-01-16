const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { response } = require('express');
const NaListiSchema = Joi.object({
    ListaId: Joi.number(),
    NamirnicaId: Joi.number()
});

router.get('/', async function(req,res){
    try {
        const sqlQuery = 'SELECT * FROM NaListi';
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
});
router.post('/', async function(req,res) {
    try {
        body = req.body
        const {error,value} = NaListiSchema.validate(req.body);
        NamirnicaId= body.NamirnicaId
        ListaId = body.ListaId
        if(error)
        {
            return res.send("Nisu dobro popunjeni parametri" + error);
        }
        const sqlQuery = 'INSERT INTO NaListi (Lista_id, Namirnica_id) VALUES (?,?)';
        const result = await pool.query(sqlQuery, [ListaId, NamirnicaId]);

        res.status(200).json("Poslato");

    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.delete('/', async function(req,res) {
    const ListaId = req.body.ListaId;
    const NamirnicaId = req.body.NamirnicaId;
    const sqlQuery = "DELETE FROM NaListi WHERE Namirnica_id=?, Lista_id=?;";
    const result = await pool.query(sqlQuery, [id]);
    return res.send("Uspeh")
})







module.exports = router;