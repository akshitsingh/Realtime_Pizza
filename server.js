const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts')

const PORT = process.env.PORT || 3000;

global.__baseDir = __dirname

// app.use(expressLayout);
app.use(express.static('public'))
app.use(expressLayout);
app.set('views',path.join(__dirname,'app/resources/views'))
app.set('view engine','ejs');


app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/cart',(req,res)=>{
    res.render('customers/cart')
})

app.get('/login',(req,res)=>{
    res.render('auth/login')
})

app.get('/register',(req,res)=>{
    res.render('auth/register')
})

app.listen(PORT , ()=>{
    console.log(path.join(__dirname, 'app/resources/views'))
    console.log("listening on port",+ PORT)
})