// npm init
// npm i express
// npm i mongoose

const connectToMongo = require("./db");
require("dotenv").config();

const express = require('express')
var cors = require("cors");
const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())
connectToMongo();

//! Available Routes
// app.get('/', async (req, res) => {
//     const userAgentInfo = getUserAgentInfo(req);
//   res.send(userAgentInfo);
//   });

app.use('/api/auth', require("./routes/Auth"));
app.use('/api/notes', require("./routes/Notes"));

app.listen(port, () => {
    console.log(`[+] Listening on port ${port}...`)
})