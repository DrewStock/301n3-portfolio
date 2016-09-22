
// Modules wrapped in IIFE
(function(module) {

// DONE: Utilize functional programming to assign properties for portfolio objects

  // Object constructor functions that create portfolio objects, used for adding content to the Projects and About sections
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

  // Declaration of Projects.all and About.all arrays
  Projects.all = [];

  About.all = [];

  // Prototypes of constructor functions to add new content to the DOM using Handlebars JS template
  Projects.prototype.toHtml = function() {
    var projectTemplate = Handlebars.compile($('#projectTemplate').text());
    return projectTemplate(this);
  };

  About.prototype.toHtml = function() {
    var aboutTemplate = Handlebars.compile($('#bioTemplate').text());
    return aboutTemplate(this);
  };

  // Using push method on Projects.all About.all to add portfolio source data (JSON objects) to arrays
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


  //TODO: Refactor .retrieveAll functions (Projects.retrieveAll and About.retrieveAll). Currently, these functions are essentially identical and used for the same purpose on two separate objects, the Projects object and the About object. The purpose is to execue an AJAX call to get source data from a file, then cache the data in localStorage and perform cache invalidation. I would like to accomplish this with more efficient code that is less repetitive.

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
      console.log('using ajax for Projects data');
      $.getJSON('/data/projectsSourceData.json', function(data) {
        console.log('projectsSourceData:', data);
        Projects.loadAll(data);
        localStorage.setItem('projectsSourceData', JSON.stringify(data));
        // portfolioView.initIndexPage();
      });
    }

    // Helper function to get projectsSourceData from localStorage
    function retrieveFromLocalStorage(){
      console.log('using local storage for Projects data');
      var localStorageData = localStorage.getItem('projectsSourceData');
      var localStorageDataJSON = JSON.parse(localStorageData);
      Projects.loadAll(localStorageDataJSON);
      // portfolioView.initIndexPage();
    }
  };

  // AJAX call to get portfolio aboutSourceData from JSON file
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
            console.log('etag2 matches and in local storage');
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

    // Helper function to get aboutSourceData from JSON file if it isn't stored in localStorage
    function retrieveFromDisk(){
      console.log('using ajax for About data');
      $.getJSON('/data/aboutSourceData.json', function(data) {
        console.log('aboutSourceData:', data);
        About.loadAll(data);
        localStorage.setItem('aboutSourceData', JSON.stringify(data));
        portfolioView.initIndexPage();
      });
    }

    // Helper function to get aboutSourceData from localStorage
    function retrieveFromLocalStorage(){
      console.log('using local storage for About data');
      var localStorageData = localStorage.getItem('aboutSourceData');
      var localStorageDataJSON = JSON.parse(localStorageData);
      About.loadAll(localStorageDataJSON);
      portfolioView.initIndexPage();
    }
  };

  module.Projects = Projects;

  module.About = About;

})(window);
