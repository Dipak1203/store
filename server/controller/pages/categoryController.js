
import db from '../../conn/conn.js'

const categoryController = {
    create(req,res){
        const { category } = req.body;
        try {
          const createQuery = `INSERT INTO category(category) VALUES(?)`;
          db.query(createQuery, [category], (err, result) => {
            if (err) {
              res.status(500).json({ message: 'Internal server error' });
              return;
            }
            res.status(201).json({ message: 'category inserted', result });
          });
        } catch (error) {
          res.status(500).json({ message: 'Internal server error' });
        }
    },
    show(req,res){
        try {
            const query = "SELECT * FROM category";
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
            const dlt = `DELETE FROM category WHERE id=${id}`;
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
        const { updateCategory } = req.body;
        try {
          const update = `UPDATE category SET category=? WHERE id=?`;
          db.query(update, [updateCategory, id], (err, result) => {
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
          const qr = `SELECT * FROM category WHERE id=?`;
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

export default categoryController;