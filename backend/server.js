const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const config = require('./config/config');
const connection = mysql.createConnection(config.dbConfig);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

connection.connect((err) => {
  return (err) ? console.log('error', err) : console.log('Successfully connected to database:', config.dbConfig.database);
  });

connection.on('error', (err) => {
  console.log('error', err);
});

require('./routes/route')(app, express, connection);
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});