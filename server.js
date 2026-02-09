require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

let mongoConnected = false;

// Connect to MongoDB
const connectDB = async () => {
    if (mongoConnected) return;
    
    if (!MONGO_URI) {
        console.error('ERROR: MONGO_URI is not set in environment variables');
        throw new Error('MONGO_URI environment variable is missing');
    }
    
    try {
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 10000,
            retryWrites: true,
            w: 'majority'
        });
        mongoConnected = true;
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        mongoConnected = false;
        throw err;
    }
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
    if (!mongoConnected) {
        try {
            await connectDB();
            next();
        } catch (err) {
            console.error('Database connection failed:', err.message);
            return res.status(500).json({ 
                message: 'Database connection failed',
                error: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        }
    } else {
        next();
    }
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }).catch(err => {
        console.error('Failed to start server:', err.message);
        process.exit(1);
    });
}

module.exports = app;
