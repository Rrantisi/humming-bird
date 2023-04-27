const mongoose = require('mongoose');

// mongoose.connect(process.env.DATABASE_URL);

mongoose.connect( process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('connected', function() {
    console.log(`Connected to MongoDb ${db.name} on ${db.host} port: ${db.port}`)
});