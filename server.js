const mongoose = require("mongoose")
const express = require("express")
var cors = require('cors');
const logger = require("./logger");
const songRouter = require('./router/song')
const authRouter = require('./router/auth')
const userRouter = require('./router/user')
const managementRouter = require('./router/management')
const { connectToDB } = require("./db/index");
const app = express();
app.use(express.json());




var cors = require('cors');
app.use(cors());

app.use("/user", userRouter,)
app.use("/song", songRouter,)
app.use("/auth", authRouter,)
app.use("/mangment", managementRouter)
app.use((err, req, res, next) => {
    console.log(err[0].stack + " " + err[1])
    logger.error(err[0].stack)
    res.status(err[1]).send()

})
connectToDB();
app.listen(process.env.PORT, () => { console.log("server is runnig") })