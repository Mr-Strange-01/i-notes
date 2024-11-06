const connectToMongoDB = require('./connect_db.js');
const express = require('express');
const post = 3001;
const app = express();

connectToMongoDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(post, () => {
    console.log(`Example app listening on port ${post}!`);
});
