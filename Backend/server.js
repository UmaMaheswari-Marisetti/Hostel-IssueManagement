import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import issueRoutes from './routes/issueRoutes.js';
import busSurveyRoutes from './routes/busSurveyRoutes.js';

dotenv.config();

const app=express();

app.use(express.json());
app.use(cors());
app.use('/api/auth',authRoutes);
app.use('/api/issues',issueRoutes);
app.use('/api/bus-survey', busSurveyRoutes)


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB")
   }).catch((err)=>console.log(err));


app.listen(5000,()=>{
    console.log("Backend server is running");
});
