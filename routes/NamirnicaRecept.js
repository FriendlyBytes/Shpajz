const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { response } = require('express');
const NamirnicaReceptSchema = Joi.object({
    Recept_id: Joi.number(),
    Namirnica_id: Joi.number()
});

router.get('/', async function(req,res){
    try {
        const sqlQuery = 'SELECT * FROM NamirnicaRecept';
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
});
router.post('/', async function(req,res) {
    try {
        body = req.body
        const {error,value} = NamirnicaReceptSchema.validate(req.body);
        Namirnica_id= body.Namirnica_id
        Recept_id = body.Recept_id
        if(error)
        {
            return res.send("Nisu dobro popunjeni parametri" + error);
        }
        const sqlQuery = 'INSERT INTO NamirnicaRecept (Recept_id, Namirnica_id) VALUES (?,?)';
        const result = await pool.query(sqlQuery, [Recept_id, Namirnica_id]);

        res.status(200).json("Poslato");

    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.delete('/', async function(req,res) {
    const Recept_id = req.body.Recept_id;
    const Namirnica_id = req.body.Namirnica_id;
    const sqlQuery = "DELETE FROM NamirnicaRecept WHERE Namirnica_id=?, Recept_id=?;";
    const result = await pool.query(sqlQuery, [id]);
    return res.send("Uspeh")
})

router.patch('/:id', async function(req,res) {
    try {
        body = req.body
        id = req.params.id
        const {error,value} = NamirnicaReceptSchema.validate(req.body);
        Namirnica_id = body.Namirnica_id
        Recept_id = body.Recept_id
        if(error)
        {
            return res.send("Nisu dobro popunjeni parametri" + error);
        }
        const sqlQuery = 'UPDATE NamirnicaRecept SET Namirnica_id =?, Recept_id =? WHERE id = ?'
        const result = await pool.query(sqlQuery, [Namirnica_id, Recept_id,id]);

        res.status(200).json("Poslato");

    } catch (error) {
        res.status(400).send(error.message)
    }
})





module.exports = router;