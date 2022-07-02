/***
 * Excerpted from "Design and Build Great Web APIs",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/maapis for more book information.
***/
/*****************************************
// bigco, inc
// company resources 
// 2020-02-01 : mamund
 *****************************************/

/*******************************************
// initialization and setup for DARRT
********************************************/
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');

var actions = require('./actions');
var representation = require('./representation');
var transitions = require('./transitions');
var utils = require('./lib/utils');

// set up request body parsing & response templates
router.use(bodyParser.json({type:representation.getResponseTypes()}));
router.use(bodyParser.urlencoded({extended:representation.urlencoded}));

// load response templates and input forms
var templates = representation.getTemplates();
var forms = transitions.forms;

// optional tracking middleware
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now() + " : " + req.headers.host + req.url)
  next()
})

/************************************************************************/

// shared metadata for this service
var metadata = [
  {name: "title", value: "BigCo Onboarding Records"},
  {name: "author", value: "Mike Amundsen"},
  {name: "release", value: "1.0.0"} 
];


// ***********************************************************
// public resources for the onboarding service
// ***********************************************************

// home 
router.get('/',function(req,res){
  utils.handler(req,res,actions.home,"home", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms,
      filter:"home"
    }
  )
});

// start the onboarding
router.post('/wip/', function(req,res){
  utils.handler(req,res,actions.createWIP,"onboarding", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms,
      filter:"home"
    }
  )
});

// get a list of onboarding records
router.get('/wip/',function(req,res){
  utils.handler(req,res,actions.listWIP,"onboarding", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms,
      filter:"list"
    }
  )
});

// filter the list of onboarding records
router.get('/wip/filter/', function(req,res){
  utils.handler(req,res,actions.filterWIP,"onboarding", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"list"
    }
  )
});

// get a single onboarding record
router.get('/wip/:id', function(req,res){
  utils.handler(req,res,actions.readWIP,"onboarding", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

// get the company values for a single record
router.get('/wip/:id/company', function(req,res){
  utils.handler(req,res,actions.readCompany,"onboarding", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

// update the company values for a single record
router.put('/wip/:id/company', function(req,res){
  utils.handler(req,res,actions.writeCompany,"onboarding", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

// get the account values for a single record
router.get('/wip/:id/account', function(req,res){
  utils.handler(req,res,actions.readAccount,"onboarding", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

// update the account values for a single record
router.put('/wip/:id/account', function(req,res){
  utils.handler(req,res,actions.writeAccount,"onboarding", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

// get the activity values for a single record
router.get('/wip/:id/activity', function(req,res){
  utils.handler(req,res,actions.readActivity,"onboarding", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

// update the activity values for a single record
router.put('/wip/:id/activity', function(req,res){
  utils.handler(req,res,actions.writeActivity,"onboarding", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

// get the status of a single record
router.get('/wip/:id/status', function(req,res){
  utils.handler(req,res,actions.readStatus,"onboarding", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

// write the status of a single record
router.put('/wip/:id/status', function(req,res){
  utils.handler(req,res,actions.writeStatus,"onboarding", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

/*
// remove a single record
router.delete('/:onboardingId', function(req,res){
  utils.handler(req,res,actions.remove,"onboarding", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});
*/

// publish the capability routes
module.exports = router
