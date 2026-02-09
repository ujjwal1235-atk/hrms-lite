require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

let mongoConnected = false;

// Connect to MongoDB on first request
const connectDB = async () => {
    if (mongoConnected) return;
    
    try {
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 5000,
        });
        mongoConnected = true;
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
};

// For local development
if (process.env.NODE_ENV !== 'production') {
    connectDB().catch(err => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });
    
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// For Vercel serverless - connect on each request
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({ message: 'Database connection failed' });
    }
});

module.exports = app;
