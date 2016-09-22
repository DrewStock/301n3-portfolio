
(function(module) {

  // Declaration of portfolioView object
  var portfolioView = {};

  //TODO: Recode this, response is slow
  // Controls view of tabs feature on main-nav
  portfolioView.tabsFeatureMainNav = function() {
    $('.main-nav .tab').on('click', function() {
      var tab_select = $(this).attr('data-content');
      var selectedTab = $('#' + tab_select);
      $('section.tab-content').hide();
      $('#header').addClass('header-margin-collapse');
      selectedTab.fadeIn(500);
      $('.layout-container').fadeIn(500).addClass('container-display-flex');
      // $('.portfolio-stats').addClass('stats-display');
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
    // $('.project-count').text(Projects.allProjects().length);
  };

  module.portfolioView = portfolioView;

})(window);
