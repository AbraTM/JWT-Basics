require("dotenv").config()
require("express-async-errors")

const express = require('express')
const app = express();
const connectDB = require('./db/connect.js')

const mainRouter = require('./routes/main.js')
const notFoundMiddlware = require('./middleware/not-found-middleware.js')
const errorHandlerMiddleware = require('./middleware/error-handler-middleware.js')

//Middleware
app.use(express.static("./public"))
app.use(express.json()) 

//Routes

app.use('/api/v1', mainRouter)

//Error Handling and NotFound
app.use(notFoundMiddlware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error){
        console.log("Error : ", error)
        process.exit(-1)
    }
}

start()