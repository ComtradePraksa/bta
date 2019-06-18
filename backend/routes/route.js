const jwt = require('jsonwebtoken');
const verifyToken = require('../verifyToken');

module.exports = function (app, express, mysqlConnection) {

  const router = express.Router();

  router.route('/accomodations')
    .get(verifyToken,(req, res) => {
      mysqlConnection.query('SELECT * FROM accomodations', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'accomodations list.' , user: req.user});
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
    .put(verifyToken,(req, res) => {
      if (!req.body.id || !req.body) {
        return res.status(400).send({ error: req.body, message: 'Please provide accomodation data and accomodation id' });
      }
      mysqlConnection.query("UPDATE accomodations SET ? WHERE id = ?", [req.body, req.body.id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'accomodation has been updated successfully.', user: req.user });
      });
    })
    .patch(verifyToken,(req, res) => {
      if (!req.body.id || !req.body) {
        return res.status(400).send({ error: req.body, message: 'Please provide accomodation data and accomodation id' });
      }
      mysqlConnection.query("UPDATE accomodations SET ? WHERE id = ?", [req.body, req.body.id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'accomodation has been patched successfully.', user: req.user });
      });
    })
    .delete(verifyToken,(req, res) => {
      if (!req.body.id) {
        return res.status(400).send({ error: true, message: 'Please provide accomodation id' });
      }
      mysqlConnection.query('DELETE FROM accomodations WHERE id = ?', [req.body.id], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'accomodation has been deleted successfully.', user: req.user });
      });
    });

  router.route('/accomodations/:id')
    .get(verifyToken,(req, res) => {
      if (!req.params.id) {
        return res.status(400).send({ error: true, message: 'Please provide accomodation id' });
      }
      mysqlConnection.query('SELECT * FROM accomodations where id=?', req.params.id, function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'accomodations list by id.', user: req.user });
      });
    });

  router.route('/users')
    .get(verifyToken,(req, res) => {
      mysqlConnection.query('SELECT * FROM users', function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Users list.', user: req.user });
      });
    });
  router.route('/users')
    .post(verifyToken,(req, res) => {
      mysqlConnection.query('SELECT * FROM `users` WHERE username = ? && password = ?',[req.body.username,req.body.password], function (error, results) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Users list.', user: req.user });
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
    });

  router.route('/locations')
  .get(verifyToken,(req, res) => {
    mysqlConnection.query('SELECT * FROM locations', function (error, results) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Locations list.', user: req.user });
    });
  })
  .post(verifyToken,(req, res) => {
    if (!req.body) {
      return res.status(400).send({ error: true, message: 'Please provide location data' });
    }
    mysqlConnection.query("INSERT INTO locations SET ?", req.body, function (error, results) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'New location has been added successfully.', user: req.user });
    });
  })
  .put(verifyToken,(req, res) => {
    if (!req.body.id || !req.body) {
      return res.status(400).send({ error: req.body, message: 'Please provide location data and location id' });
    }
    mysqlConnection.query("UPDATE locations SET ? WHERE id = ?", [req.body, req.body.id], function (error, results) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Location has been updated successfully.', user: req.user });
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
  })
  .delete(verifyToken,(req, res) => {
    if (!req.body.id) {
      return res.status(400).send({ error: true, message: 'Please provide location id' });
    }
    mysqlConnection.query('DELETE FROM locations WHERE id = ?', [req.body.id], function (error, results) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Location has been deleted successfully.', user: req.user });
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
    });

    router.route('/location_feedbacks')
    .get(verifyToken,(req, res) => {
      mysqlConnection.query('SELECT * FROM location_feedbacks AS lf JOIN users AS u ON lf.id_user=u.id', function (error, results) {
        if (error) throw error;
        res.send({ error: false, data: results, message: 'Feedbacks list.', user: req.user });
       });
    });
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
        com: req.body.com
      }
      mysqlConnection.query('insert into location_comments (id_user,id_feedback,comments,comment_date) values (?,?,?,NOW())',
      [req.body.userId,req.body.fbId,req.body.com], function (error, results) {
        if (error) throw error;
        
        res.send({ error: false, newComment, user: req.user,insertedId:results.insertId });
       });
    });

  //login route
  router.route('/login')
    .post((req, res) => {
      mysqlConnection.query('SELECT * FROM `users` WHERE username = ? && password = ?', [req.body.username, req.body.password], function (error, results) {
        if (error) throw error;
        const loggedUser = results[0];
        console.log(loggedUser)
        if(loggedUser){
          //create and assign a token
          const token = jwt.sign({
            id: loggedUser.id,
            username: loggedUser.username,
            is_admin: loggedUser.is_admin,
            photo: loggedUser.photo,
            name:loggedUser.name,
          }, 'sdfsdfsdfsdf131sdfsdfs',{
            expiresIn: '10m'
          });
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
