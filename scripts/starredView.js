(function(module) {
  var starredView = {};

  var connectQuery = function() {
    var $connect = $('#connect');
    $connect.find('ul').empty();
    $connect.show().siblings().hide();
  };

  var render = function(starred) {
    var template = Handlebars.compile($('#starred-template').text());
    return template(starred);
  };

  // DONE: If all the data is loaded, we can prep the UI and render the repos.
  starredView.index = function() {
    // connectQuery();

    $('#connect ul').append(
      // REVIEW: we added the `name` property here as our initial filter property. Try
      // changing it to see what happens!
      starred.all.map(render)
    );
  };

  module.starredView = starredView;
})(window);
