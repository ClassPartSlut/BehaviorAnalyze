// const express = require('express');
// const app = express();

// app.set('view engine', 'hbs');


// app.get('/', (req, res)=>{

//     // res.render('home',{});
//     res.send("Hello");
// });

// app.listen(3000);

var AWS = require("aws-sdk");

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
  }
});


