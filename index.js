const express = require('express');
const post = 3001;
const app = express();
const connectToMongoDB = require('./connect_db.js');
const authRouter = require('./routes/auth.js');
const noteRouter = require('./routes/notes.js');
const bodyParser = require('body-parser');
// const 

app.get('/', (req, res) => {
    res.send('Hello World!');
});


//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//ConnectDB
connectToMongoDB();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/notes', noteRouter);

app.listen(post, () => {
    console.log(`Example app listening on port ${post}!`);
});
