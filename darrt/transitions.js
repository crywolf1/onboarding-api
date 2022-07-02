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
// transitions
// 2020-02-01 : mamund
 *****************************************/
 
 // page- and item-level forms
 exports.forms = {
   pageForms: [
     {
       id:"self",
       name:"self",
       href:"{fullurl}",
       rel: "self colllection onboarding",
       tags: "collection onboarding self home list item",
       title: "Self",
       method: "GET",
       properties:[]
     },
     {
       id:"home",
       name:"home",
       href:"{fullhost}/",
       rel: "collection onboarding",
       tags: "collection onboarding home list item",
       title: "Home",
       method: "GET",
       properties:[]
     },
     {
       id:"list",
       name:"list",
       href:"{fullhost}/wip/",
       rel:"collection onboarding",
       tags:"collection onboarding home list item",
       title:"List",
       method:"GET",
       properties:[]
     },
     {
       id:"filter",
       name:"filter",
       href:"{fullhost}/wip/filter/",
       rel:"collection onboarding filter",
       tags:"collection onboarding filter list item",
       title:"Search",
       method:"GET",
       properties:[
         {name:"status",value:""},
         {name:"companyName",value:""},
         {name:"stateProvince",value:""},
         {name:"country",value:""}
       ]
     },
     {
       id: "createWIP",
       name: "createWIP",
       href: "{fullhost}/wip/",
       rel: "create-form onboarding",
       tags: "collection onboarding list",
       title: "Create Onboarding",
       method: "POST",
       properties: [
        {name:"id",value:"{makeid}"},
        {name:"status",value:"pending"}
       ]
     }
   ],
   itemForms: [
     {
       id:"readWIP_{id}",
       name: "readWIP",
       href: "{fullhost}/wip/{id}",
       rel: "item onboarding read",
       title: "Read",
       method: "GET",
       properties: []
     },
     {
       id:"addCompany_{id}",
       name:"addCompany",
       href:"{fullhost}/wip/{id}/company",
       rel: "item edit-form onboarding",
       tags: "onboarding list item",
       title: "Add Company",
       method: "PUT",
       properties: [
         {name:"companyId",value:"{companyId}"},
         {name:"companyName",value:"{companyName}"},
         {name:"email",value:"{email}"},
         {name:"streetAddress",value:"{streetAddress}"},
         {name:"city",value:"{city}"},
         {name:"stateProvince",value:"{stateProvince}"},
         {name:"postalCode",value:"{postalCode}"},
         {name:"country",value:"{country}"},
         {name:"telephone",value:"{telephone}"},
         {name:"email",value:"{email}"}
       ]
     },
     {
       id:"addAccount_{id}",
       name:"addAccount",
       href:"{fullhost}/wip/{id}/account",
       rel: "item edit-form onboarding",
       tags: "onboarding list item",
       title: "Add Account",
       method: "PUT",
       properties: [
         {name:"accountId",value:"{accountId}"},
         {name:"division",value:"{division}"},
         {name:"spendingLimit",value:"{spendingLimit}"},
         {name:"discountPercentage",value:"{discountPercentage}"}
       ]
     },
     {
       id:"addActivity_{id}",
       name:"addActivity",
       href:"{fullhost}/wip/{id}/activity",
       rel: "item edit-form onboarding",
       tags: "onboarding list item",
       title: "Add Activity",
       method: "PUT",
       properties: [
         {name:"activityId",value:"{activityId}"},
         {name:"activityType",value:"{activityType}"},
         {name:"dateScheduled",value:"{dateScheduled}"},
         {name:"notes",value:"{notes}"}
       ]
     },
     {
       id:"approve_{id}",
       name:"approve",
       href:"{fullhost}/wip/{id}/status",
       rel: "item onboarding approve",
       tags: "onboarding item list approve",
       title: "Approve",
       method: "PUT",
       properties: [
         {name:"status",value:"active"}
       ]
     },
     {
       id:"reject_{id}",
       name:"reject",
       href:"{fullhost}/wip/{id}/status",
       rel: "item onboarding reject",
       tags: "onboarding item list reject",
       title: "Reject",
       method: "PUT",
       properties: [
         {name:"status",value:"closed"}
       ]
     }
   ]
 }
