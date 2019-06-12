module.exports = function (app, express, mysqlConnection) {

  let router = express.Router();

  router.route('/hotels')
    .get((req, res) => {
      mysqlConnection.query('SELECT * FROM hotels', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Hotels list.' });
      });
    })
    .post((req, res) => {
      if (!req.body) {
        return res.status(400).send({ error: true, message: 'Please provide hotel data' });
      }
      mysqlConnection.query("INSERT INTO hotels SET ?", req.body, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New hotel has been added successfully.' });
      });
    })
    .put((req, res) => {
      if (!req.body.id || !req.body) {
        return res.status(400).send({ error: req.body, message: 'Please provide hotel data and hotel id' });
      }
      mysqlConnection.query("UPDATE hotels SET ? WHERE id = ?", [req.body, req.body.id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Hotel has been updated successfully.' });
      });
    })
    .patch((req, res) => {
      if (!req.body.id || !req.body) {
        return res.status(400).send({ error: req.body, message: 'Please provide hotel data and hotel id' });
      }
      mysqlConnection.query("UPDATE hotels SET ? WHERE id = ?", [req.body, req.body.id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Hotel has been patched successfully.' });
      });
    })
    .delete((req, res) => {
      if (!req.body.id) {
        return res.status(400).send({ error: true, message: 'Please provide hotel id' });
      }
      mysqlConnection.query('DELETE FROM hotels WHERE id = ?', [req.body.id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Hotel has been deleted successfully.' });
      });
    });

  router.route('/hotels/:id')
    .get((req, res) => {
      if (!req.params.id) {
        return res.status(400).send({ error: true, message: 'Please provide hotel id' });
      }
      mysqlConnection.query('SELECT * FROM hotels where id=?', req.params.id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Hotels list by id.' });
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
        return res.send({ error: false, data: results[0], message: 'Locations list by id.' });
      });
    });

  app.use(router);
};