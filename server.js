// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", function (req, res) {
  const theDate = new Date()
  const resultUnix = theDate.getTime();
  const resultUTC = theDate.toUTCString();
  return res.json({ unix: resultUnix, utc: resultUTC })
});

app.get('/api/:date', (req, res) => {

  console.log(req.params)

  const { date } = req.params
  const theDateUTC = new Date(date);
  const theDateunix = new Date(date * 1);

  const resultUnix1 = theDateUTC.getTime();
  const resultUTC1 = theDateUTC.toUTCString();

  const resultUnix2 = theDateunix.getTime();
  const resultUTC2 = theDateunix.toUTCString();

  console.log(resultUnix1, resultUTC1, resultUnix2, resultUTC2)

  if (resultUTC1 === "Invalid Date" && resultUTC2 === "Invalid Date") {
    return res.status(404).json({ error: "Invalid Date" });
  }
  else if (resultUnix1 === null || resultUTC1 === "Invalid Date") {
    return res.json({ unix: resultUnix2, utc: resultUTC2 })
  } else if (resultUnix2 === null || resultUTC2 === "Invalid Date") {
    return res.json({ unix: resultUnix1, utc: resultUTC1 })
  }
  else {
    return res.status(404).json({ error: "Invalid Date" });
  }

})



// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });
app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})