const mongoose = require('mongoose');

 function connectMongo(URI) { // function connectMongo(URI="mongodb://127.0.0.1:27017/hotels")
     mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true, // Add recommended options
    });
    const db = mongoose.connection;

    // Add event listeners
    db.once('open', () => {
        console.log('MongoDB connected');
    });

    db.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });

    db.on('error', (err) => {
        console.error('Connection error:', err);
    });

    return db; // Optional: Return the connection object if needed
}

// Export the connectMongo function
module.exports = connectMongo;
