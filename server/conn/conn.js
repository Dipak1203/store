import mysql from 'mysql2';
import 'dotenv/config'
const {DB_HOST,DB_USER,DB_PASSWORD,DB_NAME} = process.env;

const db = mysql.createConnection({
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_NAME
});

db.connect((err) =>{
    if(err) throw err;
    console.log("Database connected")
})
export default db;
