const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/i-notes';

const connectToMongoDB = async () => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('DB Connected');
}

module.exports = connectToMongoDB;