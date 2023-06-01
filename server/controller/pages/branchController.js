
import db from '../../conn/conn.js'

const branchController = {
    create(req,res){
        const { branch } = req.body;
        try {
          const createQuery = `INSERT INTO branch(branch) VALUES(?)`;
          db.query(createQuery, [branch], (err, result) => {
            if (err) {
              res.status(500).json({ message: 'Internal server error' });
              return;
            }
            res.status(201).json({ message: 'branch inserted', result });
          });
        } catch (error) {
          res.status(500).json({ message: 'Internal server error' });
        }
    },
    show(req,res){
        try {
            const query = "SELECT * FROM branch";
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
            const dlt = `DELETE FROM branch WHERE id=${id}`;
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
        const { updateBranch } = req.body;
        try {
          const update = `UPDATE branch SET branch=? WHERE id=?`;
          db.query(update, [updateBranch, id], (err, result) => {
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
          const qr = `SELECT * FROM branch WHERE id=?`;
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

export default branchController;