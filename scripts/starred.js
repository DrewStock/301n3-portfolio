(function(module) {
  var starred = {};

  starred.all = [];

  starred.requestStarred = function(callback) {
    $.ajax({
      url: 'https://api.github.com/users/drewstock/starred',
      type: 'GET',
      headers: {
        'Authorization': 'token ' + githubToken
      },
      success: function(data) {
        starred.all = data;
        callback();
      },
      error: function() {
        console.log('WTF?!');
      }
    });
  };

  // DONE: Model method that filters the full collection for repos with a particular attribute.
  // You could use this to filter all repos that have a non-zero `forks_count`, `stargazers_count`, or `watchers_count`.
  // repos.with = function(attr) {
  //   return repos.all.filter(function(repo) {
  //     return repo[attr];
  //   });
  // };

  module.starred = starred;
})(window);
