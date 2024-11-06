const express = require('express');
const post = 3001;
const app = express();
// const 
const connectToMongoDB = require('./connect_db.js');

connectToMongoDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Routes
// app.use('/api/auth', );

app.listen(post, () => {
    console.log(`Example app listening on port ${post}!`);
});
