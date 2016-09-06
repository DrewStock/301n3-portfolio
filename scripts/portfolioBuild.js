// This variable stores an array that contains the project article objects which are created by the constructor function
var projectArticles = [];

// Object constructor function that creates project article objects
function ProjectArticle (prs) {
  this.projectTitle = prs.projectTitle;
  this.projectUrl = prs.projectUrl;
  this.projectDesc = prs.projectDesc;
  this.projectImg = prs.projectImg;
};

// Prototype of constructor function uses .toHtml() to add new content to the DOM
ProjectArticle.prototype.toHtml = function() {
  var projectTemplate = $('#projectTemplate').html();
  var compiledProjectTemplate = Handlebars.compile(projectTemplate);
  return compiledProjectTemplate(this);
};

portfolioData.forEach(function(el) {
  projectArticles.push(new ProjectArticle(el));
});

projectArticles.forEach(function(a){
  $('#projects').append(a.toHtml());
});
