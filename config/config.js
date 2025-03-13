import dotenv from 'dotenv';
dotenv.config();

const { MONGODB_URI, PORT = 5001 } = process.env;

export default {
    MONGODB_URI,
    PORT,
};