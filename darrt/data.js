/***
 * Excerpted from "Design and Build Great Web APIs",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/maapis for more book information.
***/
// ****************************************
// bigco, inc
// data elements for onboarding
// properties, requireds, enums, defaults
// 2020-02-01 : mamund
// ****************************************

// this service's message properties
exports.props = [
  'id','status','dateCreated','dateUpdated',  
  
  'companyId','companyName','streetAddress','city','stateProvince',
  'postalCode','country','telephone','email',
  
  'accountId','division','spendingLimit','discountPercentage',
  
  'activityId','activityType','dateScheduled','notes'
];

// required properties
exports.reqd = ['id','status'];

// enumerated properties
exports.enums = [
  {status:['pending','active','suspended','closed']},
  {division:['DryGoods','Hardware','Software','Grocery','Pharmacy','Military']},
  {activityType:['email','inperson','phone','letter']}
];

exports.defs = [
  {name:"spendingLimit", value:"10000"},
  {name:"discountPercentage", value:"10"},
  {name:"activityType", value:"email"},
  {name:"status",value:"pending"}
]


