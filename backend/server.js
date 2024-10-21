import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';  
import commentRoutes from './routes/commentRoutes.js';  

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());              
app.use(express.json());      

connectDB();  

app.use('/api/comments', commentRoutes);  

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
