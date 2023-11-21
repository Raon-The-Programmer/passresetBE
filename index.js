const mongoose = require('mongoose');
const express = require('express');
const { MONGODB_URI, PORT } = require('./utilies/config');
const cors=require('cors');
const userRouter = require('./controllers/register');

const app = express();
app.use(cors());
app.use(express.json())
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connecting mongoDb.....')
    })
    .catch((error) => {
        console.log(error)
    });
 
    app.use('/api/user',userRouter)

app.listen(PORT, (req, res) => {
    console.log(`server running http://localhost:${PORT}` )
})