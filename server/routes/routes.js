import express from 'express';
import db from '../conn/conn.js';
const router = express.Router();



  router.get('/users/data', async (req, res) => {
    try {
        const dbQuery = `SELECT * FROM users`;

        db.query(dbQuery, (err, result) => {
            if (err) throw err;
            res.status(201).json({ message: "Succcess", result })
        })
    } catch (error) {

    }
});



export default router;