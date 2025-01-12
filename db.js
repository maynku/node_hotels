const mongoose = require('mongoose');
const mongoURL = 'mongodb://127.0.0.1:27017/hotels';

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
    console.log('MongoDB connected');
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

db.on('error', (err) => {
    console.log('Connection error:', err);
});

module.exports = db;
