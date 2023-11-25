const mongoose = require('mongoose');
const express = require('express');
const { MONGODB_URI, PORT } = require('./utilies/config');
const cors=require('cors');
const userRouter = require('./controllers/register');
const loginRouter = require('./controllers/longin');
const passwordRouter = require('./controllers/passwordreset');

const app = express();
app.use(cors());
app.use(express.json())
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connecting mongoDb.....')
    })
    .catch((error) => {
        console.log(error)
    });
 
    app.use('/api/user',userRouter)
    app.use('/api/login', loginRouter)
    app.use('/api/passwordreset',passwordRouter)

app.listen(PORT, (req, res) => {
    console.log(`server running http://localhost:${PORT}` )
})