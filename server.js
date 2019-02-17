// https://nodechef-mongo-6060.nodechef.com/

const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

//Local
// var url = "mongodb://localhost:27017/mydb";

//nodeChef
var url = 'mongodb://test-6060:XAoHOB1DkyVbfQt0VtL9ZKsT1dl3Oy@db-test-6060.nodechef.com:5405/test'

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));





app.get('/api', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        var mysort = { name: -1 };
        dbo.collection("customers").find().sort(mysort).toArray(function (err, result) {
            if (err) throw err;
            res.send(result)
            db.close();
        });
    });
})

app.listen(port, () => console.log(`server listening on port ${port}!!!`))