const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const formidable = require('formidable');
// const router = express.Router();
app.set('view engine', 'hbs');

// serve the static files in public folder
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: false }));


let text = {};
app.get('/', (req, res)=>{
    // TO-DO: Call API to get the speech-to-text json file
    // test it with dummy data first

    form_result = req.body;
    res.render('home',{});

});

app.post('/', (req, res)=>{
    new formidable.IncomingForm().parse(req)
    .on('fileBegin', (name, file) => {
        file.path = __dirname + '/uploads/' + file.name
    })
    .on('file', (name, file) => {
      console.log('Uploaded file', name, file)
    })
    res.send('successfully uploaded!');
    res.redirect('/');

});

app.get('/analysis', (req, res)=>{
    fs.readFile('dummy.json', (err, data)=>{
        if(err) {console.log(err);}
        text = JSON.parse(data);
        res.render('analysis',{speakers : text['speakers']});
    });
    
});

app.get('/filter', (req, res)=>{
    const query = req.query['keywords'];
    const filtered = text['speakers'].filter(person => person['text'].includes(query));
    console.log(filtered);
    res.render('analysis',{speakers: filtered});
});

// AWS.config.getCredentials(function(err) {
//   if (err) console.log(err.stack);
//   // credentials not loaded
//   else {
//     console.log("Access key:", AWS.config.credentials.accessKeyId);
//     console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
//   }
// });

app.listen(3000);
