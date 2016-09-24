
// Module wrapped in IIFE
(function(module) {

  // Declaration of portfolioView object
  var portfolioView = {};

  // Controls view of tabs feature on main-nav
  portfolioView.tabsFeatureMainNav = function() {
    $('.main-nav .tab').on('click', function() {
      var tab_select = $(this).attr('data-content');
      var selectedTab = $('#' + tab_select);
      $('section.tab-content').hide();
      $('.layout-container').addClass('container-display-flex');
      $('#header').addClass('header-margin-collapse');
      selectedTab.fadeIn(500);
    });
  };

  portfolioView.initIndexPage = function() {
    Projects.all.map(function(a){
      $('#projects').append(a.toHtml());
    });
    About.all.map(function(a){
      $('#about').append(a.toHtml());
    });
    portfolioView.tabsFeatureMainNav();
  };

  module.portfolioView = portfolioView;

})(window);
