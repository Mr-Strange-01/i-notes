const express = require('express');
const post = 3001;
const app = express();
const connectToMongoDB = require('./connect_db.js');
const authRouter = require('./routes/auth.js');
const bodyParser = require('body-parser');
// const 


//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//ConnectDB
connectToMongoDB();

//Routes
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// Routes
app.use('/api/auth', authRouter);

app.listen(post, () => {
    console.log(`Example app listening on port ${post}!`);
});
