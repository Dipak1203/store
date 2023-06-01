
import db from '../../conn/conn.js'

const wadaController = {
    create(req,res){
        const { wada } = req.body;
        try {
          const createQuery = `INSERT INTO wada(wada) VALUES(?)`;
          db.query(createQuery, [wada], (err, result) => {
            if (err) {
              res.status(500).json({ message: 'Internal server error' });
              return;
            }
            res.status(201).json({ message: 'wada inserted', result });
          });
        } catch (error) {
          res.status(500).json({ message: 'Internal server error' });
        }
    },
    show(req,res){
        try {
            const query = "SELECT * FROM wada";
            db.query(query,(err,result) =>{
              if(err) throw err;
              res.status(201).json(result)
            })
        } catch (error) {
          console.log(error)
        }
    },
    delete(req,res){
        const id = req.params.id;

        try {
            const dlt = `DELETE FROM wada WHERE id=${id}`;
            db.query(dlt,(err,result) =>{
                if(err) throw err;
                res.status(201).json({message:"deleted",result})
            })
            // console.log(id)
        } catch (error) {
            console.log(error)
        }
    },
    update(req, res) {
        const id = req.params.id;
        const { updateWada } = req.body;
        try {
          const update = `UPDATE wada SET wada=? WHERE id=?`;
          db.query(update, [updateWada, id], (err, result) => {
            if (err) throw err;
            res.status(200).json({ message: 'updated', result });
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Error updating data' });
        }
      },
      
      getData(req, res) {
        const { id } = req.params;
        try {
          const qr = `SELECT * FROM wada WHERE id=?`;
          db.query(qr, [id], (err, result) => {
            if (err) throw err;
            res.status(200).json({ message: 'selected', result });
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Error retrieving data' });
        }
      }
      
}

export default wadaController;