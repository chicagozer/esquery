var express = require('express')
var app = express()
var elasticsearch = require('elasticsearch');
var bodyParser = require('body-parser');

var client = new elasticsearch.Client({
      host: process.env.ES_URL,
      log: 'info'
    });

app.use(bodyParser.json());
app.post('/api/query', function (req, res) {
    console.dir(req.body);

    client.search({
        index: 'dealers',
        body:  req.body,
        size: 12
    }).then(function (body) {
        var hits = body.hits.hits;
        res.json(hits);
    }, function (error) {
        console.trace(error.message);
    });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
