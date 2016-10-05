(function(module) {
  var favoriteReposView = {};

  var connectQuery = function() {
    var $connect = $('#connect');
    $connect.find('ul').empty();
    $connect.show().siblings().hide();
  };

  var render = function(favoriteRepos) {
    var template = Handlebars.compile($('#favoriteRepos-template').text());
    return template(favoriteRepos);
  };

  // DONE: If all the data is loaded, we can prep the UI and render the repos.
  favoriteReposView.index = function() {
    connectQuery();

    $('#connect ul').append(
      // REVIEW: we added the `name` property here as our initial filter property. Try
      // changing it to see what happens!
      favoriteRepos.all.map(render)
    );
  };

  module.favoriteReposView = favoriteReposView;
})(window);
