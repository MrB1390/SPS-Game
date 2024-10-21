import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './Database/db.connect.js';
import router from './Router/router.gamer.js';
import sequelize from './Database/db.connect.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use('/game', router)

app.get('/',(req,res) =>{
    res.status(200).send(`<h1>SPS RECORD</h1>`)
})

const port = 4000;

app.listen(port, async ()=>{
     console.log(`App is running on Port ${port}`);

     try {
        await sequelize.sync(); // This will create the tables if they don't exist
        console.log('Database synchronized successfully');
      } catch (error) {
        console.error('Error syncing database:', error);
      }
})