// routes for users
const express = require("express");
const router = express.Router();
const db = require("../db");

router.get('/', async (req, res) => {
    const results = await db.query(`SELECT * FROM users`);
    return res.json(results.rows)
})


module.exports = router;