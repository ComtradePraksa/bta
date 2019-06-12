let express = require('express');
let bodyParser = require('body-parser');
let mysql = require('mysql');
let cors = require('cors');
let morgan = require('morgan');
let app = express();
let config = require('./config/config');
let connection = mysql.createConnection(config.dbConfig);

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

connection.connect((err) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log('Successfully connected to database:', config.dbConfig.database);
  }
});
connection.on('error', (err) => {
  console.log('error', err);
});

require('./routes/route')(app, express, connection);
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});