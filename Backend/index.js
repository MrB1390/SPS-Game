import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Database/db.connect.js';
import router from './Router/router.gamer.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use('/game', router)

app.get('/',(req,res) =>{
    res.status(200).send(`<h1>SPS RECORD</h1>`)
})

const port = process.env.PORT;

app.listen(port,()=>{
     console.log(`App is running on Port ${port}`);
})