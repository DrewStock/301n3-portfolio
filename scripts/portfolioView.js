var portfolioView = {};

portfolioView.tabsFeatureMainNav = function() {
  $('.main-nav .tab').on('click', function() {
    var tab_select = $(this).attr('data-content');
    var selectedTab = $('#' + tab_select);
    $('section.tab-content').hide();
    $('.layout-container').addClass('container-display-flex');
    $('#header').addClass('header-margin-collapse');
    selectedTab.fadeIn(250);
  });
};

$(document).ready(function() {
  portfolioView.tabsFeatureMainNav();
});
