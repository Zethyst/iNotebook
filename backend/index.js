// npm init
// npm i express
// npm i mongoose

const connectToMongo = require("./db");

const express = require('express')
var cors = require("cors");
const app = express()
const port = 5000


app.use(cors())
app.use(express.json())
connectToMongo();

//! Available Routes
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.use('/api/auth', require("./routes/Auth"));
app.use('/api/notes', require("./routes/Notes"));

app.listen(port, () => {
    console.log(`[+] Listening on port ${port}...`)
})