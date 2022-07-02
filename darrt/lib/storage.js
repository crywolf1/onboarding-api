/***
 * Excerpted from "Design and Build Great Web APIs",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/maapis for more book information.
***/
/*******************************************************
 * service: bigco customer records
 * module: darrt simple storage (via files)
 * Mike Amundsen (@mamund)
 *******************************************************/

/*
 * DARRT DATA Module
 - simple storage component writes files to disk
 - FOLDER is the collection (tasks, users, notes, etc.)
 - FILE is the record (stored as JSON object, w/ ID as filename)
 - CRUD style interface (list, item, add, update, remove)
 - "contains"-type filtering is supported, no sort or join
 - field filtering (you can provide a field list (string)
*/

var fs = require('fs');
var folder = process.cwd() + '/data/';

module.exports = main;

/*
 * args is a hash table of possible arguments
 * {object:"",action:"",filter:"",id:"",item:objItem,...}
 */
function main(args) {
  var rtn;

  // resolve arguments
  var action = args.action||"";
  var object = args.object||null;
  var filter = args.filter||null;
  var id = args.id||null;
  var item = args.item||{};
  var fields = args.fields||"";

  switch (action) {
    case 'create':
      rtn = createObject(object);
      break;
    case 'list':
      rtn = getList(object, null, fields);
      break;
    case 'filter':
      rtn = getList(object, filter, fields);
      break;
    case 'item':
      rtn = getItem(object, id, fields);
      break;
    case 'add':
      rtn = addItem(object, item, id);
      break;
    case 'update':
      rtn = updateItem(object, item, id);
      break;
    case 'remove':
      rtn = removeItem(object, id);
      break;
    default:
      rtn = null;
      break;
  }

  return rtn;
 
}

// get a list of items (possibly via filter)
function getList(object, filter, fields) {
  var coll, item, list, i, x, t, name;

  coll = [];
  try {
    list = fs.readdirSync(folder + object + '/');
    for (i = 0, x = list.length; i < x; i++) {
      item = JSON.parse(fs.readFileSync(folder + object + '/' + list[i]));
      if (filter && filter!==null) {
        t = null;
        for (var name in filter) {
          if(filter[name].toString().length!==0) {
            try {
              if (item[name].toString().toLowerCase().indexOf(filter[name].toString().toLowerCase()) !== -1) { 
                t = list[i];
              } else {
                t = null;
              }
            } catch (err) {
              t = null;
            }
          }
        }
        if (t !== null) {
          coll.push(item);
        }
      } else {
        coll.push(item);
      }
    }
  } catch (ex) {
    coll = [];
  }

  // apply field filter
  for(i=0,x=coll.length;i<x;i++) {
    coll[i] = applyFields(coll[i],fields);
  }
  
  return coll;
}

// retrieve and existing item
function getItem(object, id, fields) {
  var rtn;

  try {
    rtn = JSON.parse(fs.readFileSync(folder + object + '/' + id));
  } catch (ex) {
    rtn = exception("SimpleStorage: ["+object+"]", ex.message, 400);
  }

  rtn = applyFields(rtn, fields);
  
  return rtn;
}

// apply field list
// item = object to return
// fields = a string of field names to return
function applyFields(item,fields) {
  var rtn = {};
  
  if(fields && fields.length!==0) {
    for(var i in item) {
      if(fields.indexOf(i)!==-1) {
        rtn[i] = item[i];
      }
    }
  }
  else {
    rtn = item;
  }
  
  return rtn;
  
}

// create a storage object (folder)
function createObject(object) {
  try {
    if(folder && folder !==null) {
      if(!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
      }
    }
    if(object && object !== null) {
      fs.mkdirSync(folder + object);
    } else {
      rtn = exception("SimpleStorage: ["+object+"]", "unable to create object", 400);
    }
  } catch(ex) {
    rtn = exception("SimpleStorage: ["+object+"]", ex.message, 400);
  }
}

// add a new item
function addItem(object, item, id) {
  var rtn;

  if (id) {
    item.id = id;
  } else {
    item.id = makeId();
  }
  item.dateCreated = new Date();
  item.dateUpdated = item.dateCreated;

  if (fs.existsSync(folder + object + '/' + item.id)) {
    rtn = exception("SimpleStorage: ["+object+"]", "Record already exists");
  } else {
    try {
      fs.writeFileSync(folder + object + '/' + item.id, JSON.stringify(item));
      rtn = getItem(object, item.id);
    } catch (ex) {
      rtn = exception("SimpleStorage: ["+object+"]", ex.message, 400);
    }
  }
  return rtn;
}

// modify an existing item
function updateItem(object, item, id) {
  var current, rtn;

  current = getItem(object, id);
  
  if (!current) {
    rtn = exception("SimpleStorage: ["+object+"]", "Invalid [id]", 400);
    return rtn;
  }
  
  current = item;
  current.dateUpdated = new Date();
  
  rtn = null;
  try {
    fs.writeFileSync(folder + object + '/' + id, JSON.stringify(current));
    rtn = getItem(object, id);
  } catch (ex) {
    rtn = exception("SimpleStorage: ["+object+"]", ex.message,400);
  }

  return rtn;
}

// remove the item
function removeItem(object, id) {
  var rtn;

  try {
    fs.unlinkSync(folder + object + '/' + id);
    rtn = getList(object);
  } catch (ex) {
    rtn = getList(object);
  }
  return rtn;
}

// generate a unique id 
function makeId() {
  var rtn;

  rtn = String(Math.random());
  rtn = rtn.substring(2);
  rtn = parseInt(rtn).toString(36);

  return rtn;
}

// craft an exception msg
function exception(name, message, code, type, url) {
  var rtn = {};

  rtn.type = (type||"error");
  rtn.title = (name||"Error");
  rtn.detail = (message||rtn.name);
  rtn.status = (code||400);
  if(url) {rtn.instance = url};

  return rtn;
}

// EOF

