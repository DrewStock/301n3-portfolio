var portfolioView = {};

portfolioView.tabsFeatureMainNav = function() {
  $('.main-nav .tab').on('click', function() {
    var tab_select = $(this).attr('data-content');
    var selectedTab = $('#' + tab_select);
    $('section.tab-content').hide();
    selectedTab.show();
  });
  $('.main-nav .tab:first').click();
};

$(document).ready(function() {
  portfolioView.tabsFeatureMainNav();
});
