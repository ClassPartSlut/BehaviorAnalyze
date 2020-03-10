let speakerArr = document.getElementById('person');

const fs = require('fs');
const path = require('path');

const raw = fs.readFileSync(path.join(__dirname, '../dummy.json'));
const data = JSON.parse(raw);

for(const person of data){
    console.log(person);
}

console.log('helolo');
speakerArr = '<p>hello world</p>';