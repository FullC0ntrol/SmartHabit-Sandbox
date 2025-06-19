const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: '146.59.15.26',
    user: 'sandbox',
    password: '123456Qwe',
    database: 'sandbox'
});

db.connect(err =>{
    if(err){
        console.error("Bład połączenia z db : ", err)
        return;
    }
    console.log("Połączono z db");
});

//ENDPOINTY
app.get('/api/getuser', (req, res) => {
    const sql = 'SELECT * FROM users;';
    db.query(sql, (err, results) => {
        if(err){
            console.error("Bład zapytania", err);
            return res.status(500).json({ error: "Bład servera podczas pobierania"});
        }
        res.json(results);
    })
})

app.post('/api/setcounter', (req, res) => {
    const { liczba } = req.body;
    const sql = "UPDATE counter SET liczba = ? WHERE id = 1";
    db.query(sql, [liczba], (err, result) => {
        if(err){
            console.error('bład zapisu', err);
            return res.status(500).json({ error: "Bład zapisu"});
        }
        res.json({ success: true });
    })
})

app.get('/api/getcounter', (req, res) => {
    const sql = "SELECT liczba FROM counter WHERE id = 1";
    db.query(sql, (err, result) => {
                if(err){
            console.error("Bład zapytania", err);
            return res.status(500).json({ error: "Bład servera podczas pobierania"});
        }
        res.json(result);
    })
})

app.listen(5000, () => {
    console.log('Server działa');
})