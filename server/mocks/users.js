module.exports = function (app) {
    var express = require('express');
    var usersRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());

    // Create an embedded table using NEDB if it doesn't exist yet
    var nedb = require('nedb');
    var userDB = new nedb({filename: 'users', autoload: true});

    usersRouter.post('/', function (req, res) {

        // Look for the most recently created record
        userDB.find({}).sort({id: -1}).limit(1).exec(function (err, users) {

            if (users.length != 0)
                req.body.user.id = users[0].id + 1;
            else
                req.body.user.id = 1;

            // Insert the new record
            userDB.insert(req.body.user, function (err, newUser) {
                res.status(201);
                res.send(JSON.stringify({user: newUser}));
            })
        });
    });

    usersRouter.get('/', function (req, res) {
        userDB.find(req.query).exec(function (error, users) {
            res.send({users: users});
        });
    });

    usersRouter.get('/:id', function (req, res) {
        userDB.find(req.query).exec(function (error, users) {
            res.send({
                'users': users
            });
        });
    });

    // For now, we won't change from here down to the end
    usersRouter.put('/:id', function (req, res) {
        res.send({
            'users': {
                id: req.params.id
            }
        });
    });

    usersRouter.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    app.use('/api/users', usersRouter);
};
