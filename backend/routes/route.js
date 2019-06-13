const jwt = require('jsonwebtoken');
const secret = 'secretkeyexample';
const tokenVerification = (req, res, next) => {
  //bearer header
  const bearerHeader = req.headers['authorization'];
  //see if bearer is defined
  if (typeof bearerHeader !== 'undefined') {
    //split a bearer header by space and take second part of it(that is out token value);
    const token = bearerHeader.split(' ')[1];
    req.token = token;
    next();
  }
  else {
    res.send({
      message: 'Forbidden route'
    })
  }
}

module.exports = function (app, express, mysqlConnection) {

  const router = express.Router();

  router.route('/accomodations')
    .get((req, res) => {
      mysqlConnection.query('SELECT * FROM accomodations', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'accomodations list.' });
      });
    })
<<<<<<< HEAD
    // .post((req, res) => {
    //   if (!req.body) {
    //     return res.status(400).send({ error: true, message: 'Please provide accomodation data' });
    //   }
    //   mysqlConnection.query("INSERT INTO accomodations SET ?", req.body, function (error, results) {
    //     if (error) throw error;
    //     return res.send({ error: false, data: results, message: 'New accomodation has been added successfully.' });
    //   });
    // })
    .post(tokenVerification, (req, res) => {
      jwt.verify(req.token, secret, (err, authData) => {
        if (err) {
          res.sendStatus(403);
        }
        else {
          if (!req.body) {
            return res.status(400).send({ error: true, message: 'Please provide accomodation data' });
          }
          mysqlConnection.query("INSERT INTO accomodations SET ?", req.body, function (error, results) {
            if (error) throw error;
            return res.send({ error: false, data: results, message: 'New accomodation has been added successfully.', authData });
          });
        }
      })
=======
    .post((req, res) => {
      if (!req.body) {
        return res.status(400).send({ error: true, message: 'Please provide accomodation data' });
      }
      mysqlConnection.query("INSERT INTO accomodations SET ?", req.body, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New accomodation has been added successfully.' });
      });
>>>>>>> 9e3df226609ba57c5a0ba37433f3197f728a3ea6
    })
    .put((req, res) => {
      if (!req.body.id || !req.body) {
        return res.status(400).send({ error: req.body, message: 'Please provide accomodation data and accomodation id' });
      }
      mysqlConnection.query("UPDATE accomodations SET ? WHERE id = ?", [req.body, req.body.id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'accomodation has been updated successfully.' });
      });
    })
    .patch((req, res) => {
      if (!req.body.id || !req.body) {
        return res.status(400).send({ error: req.body, message: 'Please provide accomodation data and accomodation id' });
      }
      mysqlConnection.query("UPDATE accomodations SET ? WHERE id = ?", [req.body, req.body.id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'accomodation has been patched successfully.' });
      });
    })
    .delete((req, res) => {
      if (!req.body.id) {
        return res.status(400).send({ error: true, message: 'Please provide accomodation id' });
      }
      mysqlConnection.query('DELETE FROM accomodations WHERE id = ?', [req.body.id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'accomodation has been deleted successfully.' });
      });
    });

  router.route('/accomodations/:id')
    .get((req, res) => {
      if (!req.params.id) {
        return res.status(400).send({ error: true, message: 'Please provide accomodation id' });
      }
      mysqlConnection.query('SELECT * FROM accomodations where id=?', req.params.id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'accomodations list by id.' });
      });
    });

  router.route('/users')
    .get((req, res) => {
      mysqlConnection.query('SELECT * FROM users', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Users list.' });
      });
    });
<<<<<<< HEAD
  // router.route('/users')
  //   .post((req, res) => {
  //     mysqlConnection.query('SELECT * FROM `users` WHERE username = ? && password = ?',[req.body.username,req.body.password], function (error, results) {
  //       if (error) throw error;
  //       return res.send({ error: false, data: results, message: 'Users list.' });
  //     });
  //   });
  //test JWT
  router.route('/users')
    .post((req, res) => {
      mysqlConnection.query('SELECT * FROM `users` WHERE username = ? && password = ?', [req.body.username, req.body.password], function (error, results) {
        if (error) throw error;
        const loggedUser = results[0];
        if (loggedUser) {
          //JWT sign
          jwt.sign({ loggedUser }, secret, (err, token) => {
            if (err) console.log(err);
            return res.send({ error: false, data: results, message: 'Users list.', token: token });
          })
        }
=======
  router.route('/users')
    .post((req, res) => {
      mysqlConnection.query('SELECT * FROM `users` WHERE username = ? && password = ?',[req.body.username,req.body.password], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Users list.' });
>>>>>>> 9e3df226609ba57c5a0ba37433f3197f728a3ea6
      });
    });

  router.route('/users/:id')
    .get((req, res) => {
      if (!req.params.id) {
        return res.status(400).send({ error: true, message: 'Please provide user id' });
      }
      mysqlConnection.query('SELECT * FROM users where id=?', req.params.id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Users by id.' });
      });
    });

  router.route('/locations')
  .get((req, res) => {
    mysqlConnection.query('SELECT * FROM locations', function (error, results) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Locations list.' });
    });
  })
  .post((req, res) => {
    if (!req.body) {
      return res.status(400).send({ error: true, message: 'Please provide location data' });
    }
    mysqlConnection.query("INSERT INTO locations SET ?", req.body, function (error, results) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'New location has been added successfully.' });
    });
  })
  .put((req, res) => {
    if (!req.body.id || !req.body) {
      return res.status(400).send({ error: req.body, message: 'Please provide location data and location id' });
    }
    mysqlConnection.query("UPDATE locations SET ? WHERE id = ?", [req.body, req.body.id], function (error, results) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Location has been updated successfully.' });
    });
  })
  .patch((req, res) => {
    if (!req.body.id || !req.body) {
      return res.status(400).send({ error: req.body, message: 'Please provide location data and location id' });
    }
    mysqlConnection.query("UPDATE locations SET ? WHERE id = ?", [req.body, req.body.id], function (error, results) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Location has been patched successfully.' });
    });
  })
  .delete((req, res) => {
    if (!req.body.id) {
      return res.status(400).send({ error: true, message: 'Please provide location id' });
    }
    mysqlConnection.query('DELETE FROM locations WHERE id = ?', [req.body.id], function (error, results) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Location has been deleted successfully.' });
    });
  });

  router.route('/locations/:id')
    .get((req, res) => {
      if (!req.params.id) {
        return res.status(400).send({ error: true, message: 'Please provide location\'s id' });
      }
      mysqlConnection.query('SELECT * FROM locations where id=?', req.params.id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Locations list by id.' });
      });
    });

  app.use(router);
};