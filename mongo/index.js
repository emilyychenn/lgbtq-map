const express = require('express')
const path = require('path')
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars')
const bodyparser = require('body-parser')

var app = express()

app.listen(3000, () => {
    console.log("server started at port 3000")
});