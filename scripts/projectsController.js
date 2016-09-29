(function(module) {
  var projectsController = {};

  Projects.retrieveAll();

  projectsController.index = function() {
    $('#about').hide();
    $('#connect').hide();
    $('#projects').fadeIn(500);
    $('.layout-container').addClass('container-display-flex');
    $('#header').addClass('header-margin-collapse');
  };

  module.projectsController = projectsController;
})(window);
