const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const ejsLayout = require('express-ejs-layouts')

const PORT = process.env.PORT || 3000;

app.use(ejsLayout);
app.use('views',path.join(__dirname,'/resources'))
app.set('view engine',ejs)


app.get('/',(req,res)=>{
    res.send("Hello from server")
})

app.listen(PORT , ()=>{
    console.log("listening on port",+ PORT)
})