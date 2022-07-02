/***
 * Excerpted from "Design and Build Great Web APIs",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/maapis for more book information.
***/
/*****************************************
// bigco, inc company
// representation templates
// 2020-02-01 : mamund
 *****************************************/
 
// plain JSON response template 
exports.template = 
   { 
    format : "application/json", 
    view : 
    `
      { 
          "<%=type%>" : 
          [
            <%var x=0;%>
            <%rtn.forEach(function(item){%>
              <%if(x!==0){%>,<%}%>
              {
                <%var y=0;%>
                <%for(var p in item){%>
                  <%if(y!==0){%>,<%}%>"<%=p%>" : "<%=helpers.stateValue(item[p],item,request,item[p])%>"
                  <%y=1;%>
                <%}%>
              }
              <%x=1;%>
            <%});%>
          ]
       }
    `
  }

