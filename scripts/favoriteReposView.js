(function(module) {
  var favoriteReposView = {};

  var connectQuery = function() {
    var $connect = $('#connect');
    $connect.find('ul').empty();
  };

  var render = function(favoriteRepos) {
    var template = Handlebars.compile($('#favoriteRepos-template').text());
    return template(favoriteRepos);
  };

  favoriteReposView.index = function() {
    connectQuery();

    $('#connect ul').append(
      favoriteRepos.all.map(render)
    );
  };

  module.favoriteReposView = favoriteReposView;
})(window);
