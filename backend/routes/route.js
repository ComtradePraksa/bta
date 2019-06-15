const jwt = require('jsonwebtoken');
const verifyToken = require('../verifyToken');

module.exports = function (app, express, mysqlConnection) {

  const router = express.Router();


  router.route('/accomodations')
    .get((req, res) => {
      mysqlConnection.query('SELECT * FROM accomodations', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'accomodations list.' });
      });
    })
    .post(verifyToken,(req, res) => {
      if (!req.body) {
        return res.status(400).send({ error: true, message: 'Please provide accomodation data' });
      }
      mysqlConnection.query("INSERT INTO accomodations SET ?", req.body, function (error, results) {
        if (error) throw error;
        //req.user is the info about the logged in user
        return res.send({ error: false, data: results, message: 'New accomodation has been added successfully.', user: req.user});
      });
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
  router.route('/users')
    .post((req, res) => {
      mysqlConnection.query('SELECT * FROM `users` WHERE username = ? && password = ?',[req.body.username,req.body.password], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Users list.' });
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
        res.send({ error: false, data: results[0], message: 'Locations list by id.' });
      });
    });

    router.route('/location_feedbacks')
    .get((req, res) => {
      mysqlConnection.query('SELECT * FROM location_feedbacks AS lf JOIN users AS u ON lf.id_user=u.id', function (error, results) {
        if (error) throw error;
        res.send({ error: false, data: results, message: 'Feedbacks list.' });
       });
    });

  //login route
  router.route('/login')
    .post((req, res) => {
      mysqlConnection.query('SELECT * FROM `users` WHERE username = ? && password = ?', [req.body.username, req.body.password], function (error, results) {
        if (error) throw error;
        const loggedUser = results[0];
        if(loggedUser){
          //create and assign a token
          const token = jwt.sign({
            id: loggedUser.id,
            username: loggedUser.username,
            is_admin: loggedUser.is_admin,
            photo: loggedUser.photo
          }, 'secretkey');
          //res now includes all info specified in jwt.sign method
          res.send({token});
        }
        else{
          res.send({message: 'No user with those credentials'});
        }
      });
    });
  app.use(router);
};
