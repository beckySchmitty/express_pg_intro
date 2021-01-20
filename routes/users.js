// routes for users
const express = require("express");
const router = express.Router();
const db = require("../db");

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

router.post('/', (req, res, next) => {
    try {

    } catch(e) {
        next(e)
    }
})
module.exports = router; 