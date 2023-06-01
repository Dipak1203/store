import db from "../conn/conn.js";
const productController = {
  register(req, res) {
    const {
      name,
      branchID,
      categoryID,
      details,
      price,
      status,
      wadaID,
      symbolNumber,
    } = req.body;

    try {
      const create =
        "INSERT INTO products (name,price,sku,details,categoryID,wadaID,branchID,status) VALUES (?,?,?,?,?,?,?,?)";
      db.query(
        create,
        [name, price, symbolNumber,details, categoryID, wadaID, branchID, status],
        (err, result) => {
          if (err) throw err;
          res.status(201).json({ message: "inserted", result });
        }
      );
    } catch (error) {
      res.status(522).json({ message: "internal server error" });
    }
  },

  show (req,res){
    try {
        const show = `SELECT * FROM products`;
        db.query(show,(err,result) =>{
            if(err) throw err;
          res.status(201).json({message:"Data fetching success:",result})
        })
    } catch (error) {
        res.status(522).json({ message: "internal server error" });
    }
  },
  
  delete(req,res){
    const id = req.params.id;

    try {
        const dlt = `DELETE FROM products WHERE id=${id}`;
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
      const update = `UPDATE products SET ? WHERE id=?`;
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
      const qr = `SELECT * FROM products WHERE id=?`;
      db.query(qr, [id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'selected', result });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving data' });
    }
  }
  
};

export default productController;
