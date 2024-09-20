import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true
    },

    score: {
        type: Number,
        required: true

    },
});

export default mongoose.model('loginSchema', loginSchema);