import db from "../../conn/conn.js";

const CountController = {
    async count(req,res,table){
        try {
            const countQr = `SELECT COUNT(id) FROM ${table}`;
            db.query(countQr,(err,result) =>{
                if(err) throw err;
                res.json({result})
            })
        } catch (error) {
            res.status(501).json({messsage:"internal server error",error})
        }
    }
}

export default CountController;