(function(module) {
  var starredController = {};

  starredController.index = function() {
    // REVIEW: Look at this method chaning. What is being accomplished here?
    $('#connect').show().siblings().hide();

    // DONE: Call a function to 'request' our repo data.
    // Pass in a view function as a callback, so our repos will render after the data is loaded.
    starred.requestStarred(starredView.index);
  };

  module.starredController = starredController;
})(window);
