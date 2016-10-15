
page('/', function (e) {
  $('#projects').hide();
  $('#about').hide();
  $('#connect').hide();
});

page('/projects', projectsController.index);

page('/about', aboutController.index);

page ('/connect', connectController.index);

page ('/connect/GitHub-favorites', function(e) {
  favoriteRepos.requestStarred(favoriteReposView.index);
});


page();
