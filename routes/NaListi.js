const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { response } = require('express');
const NaListiSchema = Joi.object({
    Lista_id: Joi.number(),
    Namirnica_id: Joi.number()
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
        Namirnica_id= body.Namirnica_id
        Lista_id = body.Lista_id
        if(error)
        {
            return res.send("Nisu dobro popunjeni parametri" + error);
        }
        const sqlQuery = 'INSERT INTO NaListi (Lista_id, Namirnica_id) VALUES (?,?)';
        const result = await pool.query(sqlQuery, [Lista_id, Namirnica_id]);

        res.status(200).json("Poslato");

    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.delete('/', async function(req,res) {
    const ListaId = req.body.Lista_id;
    const NamirnicaId = req.body.Namirnica_id;
    const sqlQuery = "DELETE FROM NaListi WHERE Namirnica_id=?, Lista_id=?;";
    const result = await pool.query(sqlQuery, [id]);
    return res.send("Uspeh")
})
router.patch('/:id', async function(req,res) {
    try {
        body = req.body
        id = req.params.id
        const {error,value} = NaListiSchema.validate(req.body);
        Lista_id = body.Lista_id
        Namirnica_id = body.Namirnica_id
        if(error)
        {
            return res.send("Nisu dobro popunjeni parametri" + error);
        }
        const sqlQuery = 'UPDATE NaListi SET Lista_id =?, Namirnica_id =? WHERE id = ?'
        const result = await pool.query(sqlQuery, [Lista_id, Namirnica_id,id]);

        res.status(200).json("Poslato");

    } catch (error) {
        res.status(400).send(error.message)
    }
})






module.exports = router;