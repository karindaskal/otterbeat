const mongoose = require("mongoose")
const express = require("express")
const app = express();
const logger = require("./logger");
const songRouter = require('./router/song')
const authRouter = require('./router/auth')
const userRouter = require('./router/user')
const managementRouter = require('./router/management')
const { connectToDB } = require("./db/index");

app.use(express.json());


app.use("/user", userRouter,)
app.use("/song", songRouter,)
app.use("/auth", authRouter,)
app.use("/mangment", managementRouter)
app.use((err, req, res, next) => {
    console.log(err[0] + " " + err[1])
    logger.error(err[0])
    res.status(err[1]).json(err[0])

})
connectToDB();
app.listen(process.env.PORT, () => { console.log("server is runnig") })