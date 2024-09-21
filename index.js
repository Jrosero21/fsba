var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
    dal.find(req.params.email).then((users) => {
        if(users.length > 0){
            console.log('User already exists');
            res.send('User already exists');    
        } else {
            dal.create(req.params.name, req.params.email, req.params.password).then((user) => {
                console.log(user);
                res.send(user);            
            });
        }
    });
});

// login user 
app.get('/account/login/:email/:password', function (req, res) {
    dal.find(req.params.email).then((user) => {
        if(user.length > 0 && user[0].password === req.params.password){
            res.send(user[0]);
        } else {
            res.send('Login failed');
        }
    });
});

// find user account
app.get('/account/find/:email', function (req, res) {
    dal.find(req.params.email).then((user) => {
        console.log(user);
        res.send(user);
    });
});

// find one user by email
app.get('/account/findOne/:email', function (req, res) {
    dal.findOne(req.params.email).then((user) => {
        console.log(user);
        res.send(user);
    });
});

// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {
    var amount = Number(req.params.amount);
    dal.update(req.params.email, amount).then((response) => {
        console.log(response);
        res.send(response);
    });
});

// update - transfer amount between two users
app.get('/account/transfer/:fromEmail/:toEmail/:amount', function (req, res) {
  const fromEmail = req.params.fromEmail;
  const toEmail = req.params.toEmail;
  const amount = Number(req.params.amount);

  dal.findOne(fromEmail).then(user => {
    if (user.balance >= amount) {
      dal.update(fromEmail, -amount).then(() => {
        dal.update(toEmail, amount).then(() => {
          res.send('Transfer successful');
        });
      });
    } else {
      res.send('Insufficient balance');
    }
  }).catch(err => res.send('Error in transfer'));
});

// all accounts
app.get('/account/all', function (req, res) {
    dal.all().then((docs) => {
        console.log(docs);
        res.send(docs);
    });
});

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);
