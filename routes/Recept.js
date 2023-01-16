const express = require('express');
const router = express.Router();
const pool = require('../helpers/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { response } = require('express');
const NamirnicaSchema = Joi.object({
    Naziv: Joi.string(),
    Vlasnik: Joi.number()
});

router.get('/', async function(req,res){
    try {
        const sqlQuery = 'SELECT * FROM Recept';
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
});
router.get('/:id', async function(req,res){
    try {
        const sqlQuery = 'SELECT * FROM Recept WHERE id=?';
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
    res.status(200).json({id:req.params.id})
});
router.post('/', async function(req,res) {
    try {
        body = req.body
        const {error,value} = ReceptSchema.validate(req.body);
        Naziv = body.Naziv
        Vlasnik = body.Vlasnik
        if(error)
        {
            return res.send("Nisu dobro popunjeni parametri" + error);
        }
        const sqlQuery = 'INSERT INTO Recept (Naziv, Vlasnik) VALUES (?,?)';
        const result = await pool.query(sqlQuery, [Naziv, Vlasnik]);

        res.status(200).json("Poslato");

    } catch (error) {
        res.status(400).send(error.message)
    }
})
router.delete('/:id', async function(req,res) {
    const id = req.params.id;
    const sqlQuery = "DELETE FROM Recept WHERE id=?;";
    const result = await pool.query(sqlQuery, [id]);
    return res.send("Uspeh")
})







module.exports = router;