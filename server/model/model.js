import db from '../conn/conn.js'

const Model = {
    show(table){
        const show = `SELECT * FROM ${table}`;
        db.query(show,(err,result) =>{
            if(err) throw err;
            return result;
        })
    }
}

export default Model;