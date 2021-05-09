require('dotenv').config()
const express = require('express')
const app = express()
require('./config/db')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)

const store = new MongoDBSession({
    uri: process.env.DB_URL,
    collection: 'session'
})

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: store,
    cookie: {
        maxAge: 1000000     // 1000 secs
    }
}))

app.set('view engine', 'ejs')

// To Handle Back Button
app.use(function(req, res, next){
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', require('./routes/auth'))

const PORT = process.env.PORT || 7000

app.listen(PORT, () => {
    console.log(`Server is Running at PORT: ${PORT}`)
})