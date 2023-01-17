const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { response } = require('express');
const UkusNamirnicaSchema = Joi.object({
    Ukus_id: Joi.number(),
    Namirnica_id: Joi.number()
});

router.get('/', async function(req,res){
    try {
        const sqlQuery = 'SELECT * FROM UkusNamirnica';
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
});
router.post('/', async function(req,res) {
    try {
        body = req.body
        const {error,value} = UkusNamirnicaSchema.validate(req.body);
        NamirnicaId= body.NamirnicaId
        ListaId = body.ListaId
        if(error)
        {
            return res.send("Nisu dobro popunjeni parametri" + error);
        }
        const sqlQuery = 'INSERT INTO UkusNamirnica (Ukus_id, Namirnica_id) VALUES (?,?)';
        const result = await pool.query(sqlQuery, [Ukus_id, Namirnica_id]);

        res.status(200).json("Poslato");

    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.delete('/', async function(req,res) {
    const Ukus_id = req.body.Ukus_id;
    const Namirnica_id = req.body.Namirnica_id;
    const sqlQuery = "DELETE FROM UkusNamirnica WHERE Namirnica_id=?, Ukus_id=?;";
    const result = await pool.query(sqlQuery, [id]);
    return res.send("Uspeh")
})

router.patch('/:id', async function(req,res) {
    try {
        body = req.body
        id = req.params.id
        const {error,value} = UkusNamirnicatSchema.validate(req.body);
        Namirnica_id = body.Namirnica_id
        Ukus_id = body.Ukus_id
        if(error)
        {
            return res.send("Nisu dobro popunjeni parametri" + error);
        }
        const sqlQuery = 'UPDATE UkusNamirnicat SET Namirnica_id =?, Ukus_id =? WHERE id = ?'
        const result = await pool.query(sqlQuery, [Namirnica_id, Ukus_id,id]);

        res.status(200).json("Poslato");

    } catch (error) {
        res.status(400).send(error.message)
    }
})






module.exports = router;