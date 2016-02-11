module.exports = function (app) {
    var express = require('express');
    var charitiesRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());

    // Create an embedded table using NEDB if it doesn't exist yet
    var nedb = require('nedb');
    var charityDB = new nedb({filename: 'charities', autoload: true});

    charitiesRouter.post('/', function (req, res) {

        // Look for the most recently created record
        charityDB.find({}).sort({id: -1}).limit(1).exec(function (err, charities) {

            if (charities.length != 0)
                req.body.charity.id = charities[0].id + 1;
            else
                req.body.charity.id = 1;

            // Insert the new record
            charityDB.insert(req.body.charity, function (err, newCharity) {
                res.status(201);
                res.send(JSON.stringify({charity: newCharity}));
            })
        });
    });

    charitiesRouter.get('/', function (req, res) {
        charityDB.find(req.query).exec(function (error, charities) {
            res.send({charities: charities});
        });
    });

    charitiesRouter.get('/:id', function (req, res) {
        charityDB.find(req.query).exec(function (error, charities) {
            res.send({
                'charities': charities
            });
        });
    });

    // For now, we won't change from here down to the end
    charitiesRouter.put('/:id', function (req, res) {
        res.send({
            'charities': {
                id: req.params.id
            }
        });
    });

    charitiesRouter.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    app.use('/api/charities', charitiesRouter);
};
