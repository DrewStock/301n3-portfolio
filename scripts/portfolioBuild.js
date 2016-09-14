
// Object constructor function that creates project article objects
function ProjectArticle (prs) {
  this.projectTitle = prs.projectTitle;
  this.projectUrl = prs.projectUrl;
  this.projectDesc = prs.projectDesc;
  this.projectImg = prs.projectImg;
};

ProjectArticle.all = [];

// Prototype of constructor function uses .toHtml() to add new content to the DOM
ProjectArticle.prototype.toHtml = function() {
  var projectTemplate = $('#projectTemplate').html();
  var compiledProjectTemplate = Handlebars.compile(projectTemplate);
  return compiledProjectTemplate(this);
};

ProjectArticle.loadAll = function(sourceData) {
  sourceData.forEach(function(ele) {
    ProjectArticle.all.push(new ProjectArticle(ele));
  });
};

ProjectArticle.retrieveAll = function() {
  $.ajax({
    url: './data/portfolioSourceData.json',
    method: 'HEAD',
    success: function(data, message, xhr) {
      console.log('xhr', xhr);
      var etag = xhr.getResponseHeader('ETag');
      console.log('etag', etag);
      if (localStorage.etag){
        var localEtag = localStorage.getItem('etag');
        if (localEtag === etag && localStorage.sourceData) {
          console.log('etag matches and in local storage');
          retrieveFromLocalStorage();
        } else {
          retrieveFromDisk();
        }
      } else {
        retrieveFromDisk();
      }
      localStorage.setItem('etag', etag);
    }
  });

  function retrieveFromDisk(){
    console.log('using ajax');
    $.getJSON('./data/portfolioSourceData.json', function(data) {
      console.log('sourceData:', data);
      ProjectArticle.loadAll(data);
      localStorage.setItem('sourceData', JSON.stringify(data));
      portfolioView.initIndexPage();
    });
  }

  function retrieveFromLocalStorage(){
    console.log('using local storage');
    var localStorageData = localStorage.getItem('sourceData');
    var localStorageDataJSON = JSON.parse(localStorageData);
    ProjectArticle.loadAll(localStorageDataJSON);
    portfolioView.initIndexPage();
  }
};
