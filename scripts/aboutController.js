(function(module) {
  var aboutController = {};

  About.retrieveAll();

  aboutController.index = function() {
    $('#projects').hide();
    $('#connect').hide();
    $('#about').fadeIn(500);
    $('.layout-container').addClass('container-display-flex');
    $('#header').addClass('header-margin-collapse');
  };

  module.aboutController = aboutController;
})(window);
