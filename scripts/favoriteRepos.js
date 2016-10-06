(function(module) {
  var favoriteRepos = {};

  favoriteRepos.all = [];

// AJAX call to GitHub API to access my favorite (i.e. "starred") repos
  favoriteRepos.requestStarred = function(callback) {
    $.ajax({
      url: 'https://api.github.com/users/drewstock/starred',
      type: 'GET',
      success: function(data) {
        favoriteRepos.all = data;
        callback();
      },
      error: function() {
        console.log('WTF?!');
      }
    });
  };

  module.favoriteRepos = favoriteRepos;
})(window);
