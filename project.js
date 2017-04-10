

request.get('https://api.github.com/repos/jquery/jquery/contributors')
       .on('error', function (err) {
         throw err;
       });
