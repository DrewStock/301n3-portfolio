// This registers a new helper method on the Handlebars template to change the format of dates
  Handlebars.registerHelper('formatDate', function(date){
    var date = new Date(date);
    if (typeof(date) == 'undefined') {
      return 'Unknown';
    }
    console.log(date);
    return (date.getMonth()+1) + '/' + date.getDate() + '/' + date.getFullYear();
  });
