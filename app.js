const express = require('express');
const app = express();

app.set('view engine', 'hbs');



app.get('/', (req, res)=>{

    res.render('home',{});

});


app.listen(3000);


