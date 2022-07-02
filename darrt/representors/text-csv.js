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
 
 // CSV response template
exports.template = 
{
  format: "text/csv",
  view: 
  `<%var y=0;%><%for(var p in rtn[0]){%><%if(y!==0){%>,<%}%>"<%=p%>"<%y=1;%><%}%>
<%rtn.forEach(function(item){%><%var y=0;%><%for(var p in item){%><%if(y!==0){%>,<%}%>"<%=item[p]%>"<%y=1;%><%}%>
<%});%>`
}

