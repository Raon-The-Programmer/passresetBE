require('dotenv').config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://parthasarathigovind2001:Partha2001@cluster0.d9xtwo1.mongodb.net/password';
const JWT_SECRET = process.env.JWT_SECRET || 'partha';
const OTP = process.env.OTP || 'zceeslzyuudjptea';

module.exports = {
    PORT,
    MONGODB_URI,
    JWT_SECRET,
    OTP,
};
