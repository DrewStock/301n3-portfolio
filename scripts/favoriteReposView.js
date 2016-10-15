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
    $('#connect ul').hide();
    $('#connect ul').append(
      favoriteRepos.all.map(render)
    );
    $('#connect ul').fadeIn(500);
  };

  module.favoriteReposView = favoriteReposView;
})(window);
