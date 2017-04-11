var request = require('request');
var fs = require ('fs')
var repoInfo = process.argv.slice(2, 4)

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = 'BrandonGA';
var GITHUB_TOKEN = '7d9aa749fd58449e98bcd6525045a8e959fa1b1b';

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub: Avatar Downloader Project'
    }
  };

  request(options, function(err, response, body) {
    if (err) throw err;
    console.log('Response Status Code:', response.statusCode);
    console.log('Content Type: ' + response.headers['content-type'])
    var avatarResults = JSON.parse(body)
    cb(err, avatarResults)
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err){
    throw err;
  })
  .pipe(fs.createWriteStream(filePath));
}


getRepoContributors(repoInfo[0], repoInfo[1], function(err, result) {
  if (!repoInfo[0] || !repoInfo[1]) {
    console.log("Error! Credentials have not been specified...")
  }else{
    console.log("Success")
  }

  console.log("Errors:", err);
  console.log("Result:", result);
  for (imageURL in result){
    downloadImageByURL(result[imageURL].avatar_url, './gitHubAvatars/' + result[imageURL].login + '.jpg')
  }
});
