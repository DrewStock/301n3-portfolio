(function(module) {
  var connectController = {};

  connectController.index = function() {
    $('#projects').hide();
    $('#about').hide();
    $('#connect').fadeIn(500);
    $('.layout-container').addClass('container-display-flex');
    $('#header').addClass('header-margin-collapse');
    // $('#connect').show().siblings().hide();
    favoriteRepos.requestStarred(favoriteReposView.index);

  };

  module.connectController = connectController;
})(window);
