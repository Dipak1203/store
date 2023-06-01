import db from '../conn/conn.js'

const usersController = {

    delete(req,res){
        const id = req.params.id;

        try {
            const dlt = `DELETE FROM users WHERE id=${id}`;
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
        const updateData= req.body;
        try {
          const update = `UPDATE users SET ? WHERE id=?`;
          db.query(update, [updateData, id], (err, result) => {
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
          const qr = `SELECT * FROM users WHERE id=?`;
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

export default usersController;