import mongoose from 'mongoose';
import express from 'express';
mongoose.set('strictQuery', false);
const app = express();
import cors from 'cors';
app.use(cors());
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const start = async() => {
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ftjh2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
        useNewUrlParser: "true",
        useUnifiedTopology: "true"
    });

    app.listen(process.env.MONGO_PORT, () => {
        console.log("Mongoose listening on port: " + process.env.MONGO_PORT);
    });
}

export default start;