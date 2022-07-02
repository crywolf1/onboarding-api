/***
 * Excerpted from "Design and Build Great Web APIs",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/maapis for more book information.
***/
/*****************************************
// bigco, inc onboarding
// root of the service API
// 2020-02-01 : mamund
 *****************************************/
 
var express = require('express');
var app = express();
var cors = require('cors');

var resources = require('./darrt/resources');
var port = process.env.PORT || 8080;

// support calls from JS in browser
app.use(cors());
app.options('*',cors()); 

// point to exposed resources for this API
app.use('/',resources); 

// start listening for requests
app.listen(port, () => console.log(`listening on port ${port}!`));
