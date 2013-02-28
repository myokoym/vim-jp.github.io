// vim:set ts=8 sts=2 sw=2 tw=0 et:

google.load("visualization", "1");
$(function() {
  var query = new google.visualization.Query('https://spreadsheets.google.com/tq?key=0AvP2GcrHKTfudEdwWm85ajZtd0ltZjRUcVFPWHpzWHc&gid=0&pub=1');
  query.send(function(response) {
    if(response.isError()) {
      return;
    }
    var data = response.getDataTable();
    for (var row = 0; row < data.getNumberOfRows(); row++) {
      var div = $('<div/>').addClass('person');
      var ul = $('<ul/>');
      var name    = data.getFormattedValue(row, 1);
      var twitter = data.getFormattedValue(row, 2);
      var github  = data.getFormattedValue(row, 3);
      var website = data.getFormattedValue(row, 4);
      var description = data.getFormattedValue(row, 5);

      // TODO: vaildation
      ul.append($('<li/>').addClass('name').text(name));
      if (twitter) {
        var twitter_url = 'https://twitter.com/' + twitter;
        var twitter_img = 'http://api.twitter.com/1/users/profile_image/' + twitter + '.png&size=mini';
        ul.prepend($('<li/>').addClass('faceicon').append($('<img/>').attr({'src': twitter_img})));
        ul.append($('<li/>').addClass('link').append($('<a/>').attr('href', twitter_url).text(twitter_url)));
      }
      if (github) {
        var github_url = 'https://github.com/' + github;
        ul.append($('<li/>').addClass('link').append($('<a/>').attr('href', github_url).text(github_url)));
      }
      if (website) {
        ul.append($('<li/>').addClass('link').append($('<a/>').attr('href', website).text(website)));
      }
      if (description) {
        ul.append($('<li/>').addClass('desc').text(description))
      }
      div.append(ul).appendTo('#vimmers-container');
    }
    $('#vimmers-container').masonry({
      isAnimated: true,
      isResizable: true
    });
  });
});
