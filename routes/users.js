// routes for users
const express = require("express");
const router = express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

router.get('/', async (req, res, next) => {
    try {
        const results = await db.query(`SELECT * FROM users`);
        return res.json(results.rows)
    } catch (e) {
        next(e);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        const { type } = req.query;
        // to prevent from SQL injection
        const resp = await db.query(`SELECT * FROM users WHERE type=$1`, [type])
        return res.json(resp.rows)
    } catch(e) {
        return next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { name, type } = req.body;
        const resp = await db.query(`INSERT INTO users (name, type) VALUES ($1, $2) RETURNING id, name, type`, [name,type])
        return res.status(201).json(resp.rows[0])
    } catch(e) {
        return next(e)
    }
})

router.patch('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {name, type} = req.body;
        const resp = await db.query(`UPDATE users SET name=$1, type=$2 WHERE id=$3 RETURNING *`, [name, type, id]);
        return res.json(resp.rows[0])
    } catch(e) {
        return next(e)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const resp = await db.query(`DELETE FROM users WHERE id=$1`, [req.params.id])
        return res.json({msg: 'deleted'})
    } catch(e) {
        return next(e)
    }

})
module.exports = router; 