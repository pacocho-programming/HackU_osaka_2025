const functions = require('firebase-functions');
const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.get('/demo_login/login.php', (req, res) => {
  exec('php public/demo_login/login.php', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(stderr);
    }
    res.send(stdout);
  });
});

app.get('*', (req, res) => {
  exec('php public/index.php', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(stderr);
    }
    res.send(stdout);
  });
});

exports.app = functions.https.onRequest(app);
