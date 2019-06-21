const jwt = require('jsonwebtoken');
const verifyToken = require('../verifyToken');

module.exports = function (app, express, mysqlConnection) {

  const router = express.Router();

  // accommodations table //
  router.route('/accommodations')
    .get(verifyToken,(req, res) => {
      mysqlConnection.query('SELECT * FROM accommodations', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Accommodations list.' , user: req.user});
      });
    })
    .post(verifyToken,(req, res) => {
      if (!req.body) {
        return res.status(400).send({ error: true, message: 'Please provide accommodation data' });
      }
      mysqlConnection.query('INSERT INTO accommodations (name, link, id_city) values (?,?,?)',
      [req.body.name, req.body.link, req.body.id_city], function (error, results) {
        if (error) throw error;
        //req.user is the info about the logged in user
        return res.send({ error: false, data: results, message: 'New accommodation has been added successfully.', user: req.user});
      });
    })
    .put(verifyToken,(req, res) => {
      if (!req.body.id || !req.body) {
        return res.status(400).send({ error: req.body, message: 'Please provide accommodation data and accommodation id' });
      }
      mysqlConnection.query("UPDATE accommodations SET ? WHERE id = ?", [req.body, req.body.id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Accommodation has been updated successfully.', user: req.user });
      });
    })
    .patch(verifyToken,(req, res) => {
      if (!req.body.id || !req.body) {
        return res.status(400).send({ error: req.body, message: 'Please provide accommodation data and accommodation id' });
      }
      mysqlConnection.query("UPDATE accommodations SET ? WHERE id = ?", [req.body, req.body.id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Accommodation has been patched successfully.', user: req.user });
      });
    });
  router.route('/accommodations/:id')
    .get(verifyToken,(req, res) => {
      if (!req.params.id) {
        return res.status(400).send({ error: true, message: 'Please provide accommodation id' });
      }
      mysqlConnection.query('SELECT * FROM accommodations where id=?', req.params.id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Accommodations list by id.', user: req.user });
      });
    })
    .delete(verifyToken,(req, res) => {
      mysqlConnection.query('DELETE FROM accommodations WHERE id = ?', req.params.id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Accommodation has been deleted successfully.', user: req.user });
      });
    });

// users table //
  router.route('/users')
    .get(verifyToken,(req, res) => {
      mysqlConnection.query('SELECT * FROM users', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Users list.', user: req.user });
      });
    })
    .post(verifyToken,(req, res) => {
      mysqlConnection.query('INSERT INTO users (name, username, password, is_admin, photo) values (?,?,?,?,?)',
      [req.body.name, req.body.username, req.body.password, req.body.is_admin, req.body.photo], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Successfully added new user', user: req.user });
      });
    });
  router.route('/users/:id')
    .get(verifyToken,(req, res) => {
      if (!req.params.id) {
        return res.status(400).send({ error: true, message: 'Please provide user id' });
      }
      mysqlConnection.query('SELECT * FROM users where id=?', req.params.id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Users by id.', user: req.user});
      });
    })
    .delete(verifyToken,(req, res) => {
      // return res.status(400).send({ error: true, message: 'Please provide user id' });
      mysqlConnection.query('DELETE FROM users WHERE id=?', req.params.id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been deleted successfully.', user: req.user });
      });
    });

// provider table //
  router.route('/provider')
    .get(verifyToken,(req, res) => {
      mysqlConnection.query('SELECT * FROM provider', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Providers list.', user: req.user });
      });
    })
    .post(verifyToken,(req, res) => {
      if (!req.body) {
        return res.status(400).send({ error: true, message: 'Please provide provider data' });
      }
      mysqlConnection.query('INSERT INTO provider (name, type) values (?,?)',
      [req.body.name, req.body.type], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New provider has been added successfully.', user: req.user });
      });
    })
    .patch(verifyToken,(req, res) => {
      if (!req.body.id || !req.body) {
        return res.status(400).send({ error: req.body, message: 'Please provide provider data and provider id' });
      }
      mysqlConnection.query("UPDATE provider SET ? WHERE id = ?", [req.body, req.body.id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Provider has been patched successfully.', user: req.user });
      });
    });
  router.route('/provider/:id')
    .get(verifyToken,(req, res) => {
      if (!req.params.id) {
        return res.status(400).send({ error: true, message: 'Please provide provider\'s id' });
      }
      mysqlConnection.query('SELECT * FROM provider where id=?', req.params.id, function (error, results) {
        if (error) throw error;
        res.send({ error: false, data: results[0], message: 'Provider list by id.', user: req.user });
      });
    })
    .delete(verifyToken,(req, res) => {
      mysqlConnection.query('DELETE FROM provider WHERE id = ?', req.params.id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Provider has been deleted successfully.', user: req.user });
      });
    });

// transportations table //
  router.route('/transportations')
    .get(verifyToken,(req, res) => {
      mysqlConnection.query('SELECT * FROM transportations', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Transportations list.', user: req.user });
      });
    })
    .post(verifyToken,(req, res) => {
      if (!req.body) {
        return res.status(400).send({ error: true, message: 'Please provide transportations data' });
      }
      mysqlConnection.query('INSERT INTO transportations (from_loaction_id, to_location_id, type, provider_id) values (?,?,?,?)',
      [req.body.from_loaction_id, req.body.to_location_id, req.body.type, req.body.provider_id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New transportation has been added successfully.', user: req.user });
      });
    })
    .put(verifyToken,(req, res) => {
      if (!req.body.id || !req.body) {
        return res.status(400).send({ error: req.body, message: 'Please provide transportations data and transportation id' });
      }
      mysqlConnection.query("UPDATE transportations SET ? WHERE id = ?", [req.body, req.body.id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Transportations has been updated successfully.', user: req.user });
      });
    })
    .patch(verifyToken,(req, res) => {
      if (!req.body.id || !req.body) {
        return res.status(400).send({ error: req.body, message: 'Please provide transportations data and transportation id' });
      }
      mysqlConnection.query("UPDATE transportations SET ? WHERE id = ?", [req.body, req.body.id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Transportation has been patched successfully.', user: req.user });
      });
    });
  router.route('/transportations/:id')
    .get(verifyToken,(req, res) => {
      if (!req.params.id) {
        return res.status(400).send({ error: true, message: 'Please provide transportation\'s id' });
      }
      mysqlConnection.query('SELECT * FROM transportations where id=?', req.params.id, function (error, results) {
        if (error) throw error;
        res.send({ error: false, data: results[0], message: 'Transportations list by id.', user: req.user });
      });
    })
    .delete(verifyToken,(req, res) => {
      mysqlConnection.query('DELETE FROM transportations WHERE id = ?', req.params.id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Transportation has been deleted successfully.', user: req.user });
      });
    });

// locations table //
  router.route('/locations')
    .get(verifyToken,(req, res) => {
      mysqlConnection.query('SELECT * FROM locations', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Locations list.', user: req.user });
      });
    })
    .post(verifyToken,(req, res) => {
      mysqlConnection.query('INSERT INTO locations (city_name, geolocation, state) values (?,?,?)',
      [req.body.city_name, req.body.geolocation, req.body.state], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New location has been added successfully.', user: req.user });
      });
    })
    .patch(verifyToken,(req, res) => {
      if (!req.body.id || !req.body) {
        return res.status(400).send({ error: req.body, message: 'Please provide location data and location id' });
      }
      mysqlConnection.query("UPDATE locations SET ? WHERE id = ?", [req.body, req.body.id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Location has been patched successfully.', user: req.user });
      });
    });
  router.route('/locations/:id')
    .get(verifyToken,(req, res) => {
      if (!req.params.id) {
        return res.status(400).send({ error: true, message: 'Please provide location\'s id' });
      }
      mysqlConnection.query('SELECT * FROM locations where id=?', req.params.id, function (error, results) {
        if (error) throw error;
        res.send({ error: false, data: results[0], message: 'Locations list by id.', user: req.user });
      });
    })
    .delete(verifyToken,(req, res) => {
      mysqlConnection.query('DELETE FROM locations WHERE id=?', req.params.id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Location has been deleted successfully.', user: req.user });
      });
    });

// location_feedbacks table //
  router.route('/location_feedbacks')
    .get(verifyToken,(req, res) => {
      mysqlConnection.query('SELECT * FROM location_feedbacks AS lf JOIN users AS u ON lf.id_user=u.id', function (error, results) {
        if (error) throw error;
        res.send({ error: false, data: results, message: 'Feedbacks list.', user: req.user });
        });
    });
    
// location_comments table //
  router.route('/location_comments')
    .get(verifyToken,(req, res) => {
      mysqlConnection.query('SELECT id_comment, comment_date,comments, users.photo,users.id,users.name,lf.id_feedback FROM location_comments AS com JOIN location_feedbacks AS lf ON lf.id_feedback=com.id_feedback INNER join users ON users.id = com.id_user ORDER BY comment_date DESC', function (error, results) {
        if (error) throw error;
        res.send({ error: false, data: results, message: 'Feedback comments list.', user: req.user });
        });
    });
  router.route('/location_comments')
    .post(verifyToken,(req, res) => {
      const newComment = {
        userId: req.body.userId ,
        fbId: req.body.fbId,
        com: req.body.com,
        dt:req.body.dt
      }
      mysqlConnection.query('insert into location_comments (id_user,id_feedback,comments,comment_date) values (?,?,?,?)',
        [req.body.userId,req.body.fbId,req.body.com,req.body.dt], function (error, results) {
          if (error) throw error;
          res.send({ error: false, newComment, user: req.user,insertedId:results.insertedId });
        });
    });

  // login route //
  router.route('/login')
    .post((req, res) => {
      mysqlConnection.query('SELECT * FROM `users` WHERE username = ? && password = ?', [req.body.username, req.body.password], function (error, results) {
        if (error) throw error;
        const loggedUser = results[0];
        if (loggedUser) {
          //create and assign a token
          const token = jwt.sign({
            id: loggedUser.id,
            username: loggedUser.username,
            is_admin: loggedUser.is_admin,
            photo: loggedUser.photo,
            name:loggedUser.name,
          }, 'sdfsdfsdfsdf131sdfsdfs',{ expiresIn: '12h' });
          //res now includes all info specified in jwt.sign method
          res.send({token});
        }
        else { res.send({message: 'No user with those credentials'}); }
      });
    });
  app.use(router);
};