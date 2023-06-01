import express from 'express';
import dotenv  from 'dotenv';
import router from './routes/routes.js';
import cors from 'cors'
import bodyParser from 'body-parser';
import './conn/conn.js'
import session from 'express-session';
import productRouter from './routes/product.js';
import wadaClient from './routes/pages/wada.js';
import categoryClient from './routes/pages/category.js';
import branchClient from './routes/pages/branch.js';
import Auth from './routes/auth/Auth.js';
import usersClient from './routes/users.js';
dotenv.config();


const app = express();


// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );


// All the routes 
app.use('/',router);
app.use('/product',productRouter);
app.use('/wada',wadaClient)
app.use('/category',categoryClient)
app.use('/branch',branchClient)
app.use('/',Auth)
app.use('/users',usersClient)

const port = process.env.SERVER_PORT || 5000;
app.listen(port,() =>{
    console.log(`app is running in port http://localhost:${port}`)
});