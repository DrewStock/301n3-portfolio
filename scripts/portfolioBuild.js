(function(module) {

//DONE: Utilize functional programming to assign properties for portfolio objects

  // Object constructor function that creates project article objects
  function Projects(props) {
    Object.keys(props).forEach(function(e, index, keys) {
      this[e] = props[e];
    },this);
  };

  function About(props) {
    Object.keys(props).forEach(function(e, index, keys) {
      this[e] = props[e];
    },this);
  };

  // Declaration of Projects.all array
  Projects.all = [];

  About.all = [];

  // Prototype of constructor function to add new content to the DOM using Handlebars JS template
  Projects.prototype.toHtml = function() {
    var projectTemplate = Handlebars.compile($('#projectTemplate').text());
    return projectTemplate(this);
  };

  About.prototype.toHtml = function() {
    var aboutTemplate = Handlebars.compile($('#bioTemplate').text());
    return aboutTemplate(this);
  };

  // Using push method on Projects.all to add portfolio projectsSourceData (JSON objects) to array
  Projects.loadAll = function(projectsSourceData) {
    projectsSourceData.map(function(ele) {
      Projects.all.push(new Projects(ele));
    });
  };

  About.loadAll = function(aboutSourceData) {
    aboutSourceData.map(function(ele) {
      About.all.push(new About(ele));
    });
  };

  // AJAX call to get portfolio projectsSourceData from JSON file
  Projects.retrieveAll = function() {
    $.ajax({
      url: '/data/projectsSourceData.json',
      method: 'HEAD',
      success: function(data, message, xhr) {
        console.log('xhr', xhr);
        var etag = xhr.getResponseHeader('ETag');
        console.log('etag', etag);
        // Conditional statement for cache invalidation
        if (localStorage.etag){
          var localEtag = localStorage.getItem('etag');
          if (localEtag === etag && localStorage.projectsSourceData) {
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

    // Helper function to get projectsSourceData from JSON file if it isn't stored in localStorage
    function retrieveFromDisk(){
      console.log('using ajax');
      $.getJSON('/data/projectsSourceData.json', function(data) {
        console.log('projectsSourceData:', data);
        Projects.loadAll(data);
        localStorage.setItem('projectsSourceData', JSON.stringify(data));
        // portfolioView.initIndexPage();
      });
    }

    // Helper function to get projectsSourceData from localStorage
    function retrieveFromLocalStorage(){
      console.log('using local storage');
      var localStorageData = localStorage.getItem('projectsSourceData');
      var localStorageDataJSON = JSON.parse(localStorageData);
      Projects.loadAll(localStorageDataJSON);
      // portfolioView.initIndexPage();
    }
  };

  About.retrieveAll = function() {
    $.ajax({
      url: '/data/aboutSourceData.json',
      method: 'HEAD',
      success: function(data, message, xhr) {
        console.log('xhr', xhr);
        var etag2 = xhr.getResponseHeader('ETag');
        console.log('etag2', etag2);
        // Conditional statement for cache invalidation
        if (localStorage.etag2){
          var localEtag2 = localStorage.getItem('etag2');
          if (localEtag2 === etag2 && localStorage.aboutSourceData) {
            console.log('etag matches and in local storage');
            retrieveFromLocalStorage();
          } else {
            retrieveFromDisk();
          }
        } else {
          retrieveFromDisk();
        }
        localStorage.setItem('etag2', etag2);
      }
    });

    // Helper function to get projectsSourceData from JSON file if it isn't stored in localStorage
    function retrieveFromDisk(){
      console.log('using ajax');
      $.getJSON('/data/aboutSourceData.json', function(data) {
        console.log('aboutSourceData:', data);
        About.loadAll(data);
        localStorage.setItem('aboutSourceData', JSON.stringify(data));
        portfolioView.initIndexPage();
      });
    }

    // Helper function to get projectsSourceData from localStorage
    function retrieveFromLocalStorage(){
      console.log('using local storage');
      var localStorageData = localStorage.getItem('aboutSourceData');
      var localStorageDataJSON = JSON.parse(localStorageData);
      About.loadAll(localStorageDataJSON);
      portfolioView.initIndexPage();
    }
  };

  module.Projects = Projects;

  module.About = About;

})(window);
