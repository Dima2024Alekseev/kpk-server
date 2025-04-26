import dotenv from 'dotenv';
dotenv.config();

const { MONGODB_URI, PORT = 5001, JWT_SECRET, REFRESH_SECRET, JWT_EXPIRES_IN, REFRESH_EXPIRES_IN } = process.env;

export default {
    MONGODB_URI,
    PORT,
    JWT_SECRET,
    REFRESH_SECRET,
    JWT_EXPIRES_IN,
    REFRESH_EXPIRES_IN,
};
