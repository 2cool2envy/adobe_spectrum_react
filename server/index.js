const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;
const cors = require('cors')
const fs = require('fs');

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));


app.get('/download', function (req, res) {
  console.log(' req.headers.city', req.headers.city)

  fs.writeFile('1.txt', req.headers.city, function (err) {
    if (err) throw err;
    else {
      console.log('Saved!');
      const file = `${__dirname}/1.txt`;
      console.log('file', file)
      res.contentType("application/txt");
      res.download(file);
    }
  });

});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


app.listen(port);

console.log('App running ' + port);