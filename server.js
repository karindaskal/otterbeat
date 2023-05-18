const mongoose = require("mongoose")
const express = require("express")
const app = express();
require('dotenv').config();
const songRouter = require('./router/song')
const authRouter = require('./router/auth')
const userRouter = require('./router/user')
const { error } = require('./eror')
const { myCache } = require('./controller/cache')

const MONGO_URL = 'mongodb+srv://karindaskal:Kkkk1111@cluster0.wd2bnfp.mongodb.net/?retryWrites=true&w=majority'
async function conect() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("conect");
    }
    catch (error) {
        console.log(error);
    }
}

app.use(express.json())
app.use(error)
app.use("/user", userRouter,)
app.use("/song", songRouter,)
app.use("/auth", authRouter,)

app.use((err, req, res, next) => {
    res.status(err[1]).json(err[0])
    logger.error(err[0])
})
conect();

//myCache.on('error', err => console.log('Redis Client Error', err));
//myCache.connect();




app.listen(3000, () => { console.log("server is runnig") })