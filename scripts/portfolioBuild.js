
var projectArticles = [];

function ProjectArticle (prs) {
  this.projectTitle = prs.projectTitle;
  this.projectUrl = prs.projectUrl;
  this.projectDesc = prs.projectDesc;
};

ProjectArticle.prototype.toHtml = function() {
  var $newProjectArticle = $('article.projectTemplate').clone();

  $newProjectArticle.find('a.projectLink').attr('href', this.projectUrl);
  $newProjectArticle.find('h2').html(this.projectTitle);
  $newProjectArticle.find('article.projectDescription').html(this.projectDesc);
  // $newProjectArticle.find('.article-body').html(this.body);
  $newProjectArticle.removeClass('projectTemplate');

  return $newProjectArticle;
};


portfolioData.forEach(function(el) {
  projectArticles.push(new ProjectArticle(el));
});

projectArticles.forEach(function(a){
  $('#projects').append(a.toHtml());
});
