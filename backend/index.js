// npm init
// npm i express
// npm i mongoose

const connectToMongo = require("./db");

const express = require('express')
const app = express()
const port = 3000

connectToMongo();
app.use(express.json())

//! Available Routes
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.use('/api/auth',require("./routes/Auth"));
app.use('/api/notes',require("./routes/Notes"));

app.listen(port, () => {
    console.log(`[+] Listening on port ${port}...`)
})