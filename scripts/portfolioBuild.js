(function(module) {

  // Object constructor function that creates project article objects
  function ProjectArticle (prs) {
    this.projectTitle = prs.projectTitle;
    this.projectUrl = prs.projectUrl;
    this.projectDesc = prs.projectDesc;
    this.projectImg = prs.projectImg;
  };

  // Declaration of ProjectArticle.all array
  ProjectArticle.all = [];

  // Prototype of constructor function to add new content to the DOM using Handlebars JS template
  ProjectArticle.prototype.toHtml = function() {
    var projectTemplate = $('#projectTemplate').html();
    var compiledProjectTemplate = Handlebars.compile(projectTemplate);
    return compiledProjectTemplate(this);
  };

  // Using push method on ProjectArticle.all to add portfolio sourceData (JSON objects) to array
  ProjectArticle.loadAll = function(sourceData) {
    sourceData.map(function(ele) {
      ProjectArticle.all.push(new ProjectArticle(ele));
    });
  };

  // AJAX call to get portfolio sourceData from JSON file
  ProjectArticle.retrieveAll = function() {
    $.ajax({
      url: '/data/portfolioSourceData.json',
      method: 'HEAD',
      success: function(data, message, xhr) {
        console.log('xhr', xhr);
        var etag = xhr.getResponseHeader('ETag');
        console.log('etag', etag);
        // Conditional statement for cache invalidation
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

    // Helper function to get sourceData from JSON file if it isn't stored in localStorage
    function retrieveFromDisk(){
      console.log('using ajax');
      $.getJSON('/data/portfolioSourceData.json', function(data) {
        console.log('sourceData:', data);
        ProjectArticle.loadAll(data);
        localStorage.setItem('sourceData', JSON.stringify(data));
        portfolioView.initIndexPage();
      });
    }

    // Helper function to get sourceData from localStorage
    function retrieveFromLocalStorage(){
      console.log('using local storage');
      var localStorageData = localStorage.getItem('sourceData');
      var localStorageDataJSON = JSON.parse(localStorageData);
      ProjectArticle.loadAll(localStorageDataJSON);
      portfolioView.initIndexPage();
    }
  };

  // Get a count of all projects
  ProjectArticle.allProjects = function () {
    return ProjectArticle.all.map(function (projectArticle) {
      return projectArticle.projectTitle;
    })
    .reduce(function (acc, name) {
      if (acc.indexOf(name) === -1) {
        acc.push(name);
      }
      return acc;
    }, []);
  };


  module.ProjectArticle = ProjectArticle;

})(window);
