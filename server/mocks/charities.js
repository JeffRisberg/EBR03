module.exports = function (app) {
    var express = require('express');
    var charitiesRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());

    var charities = [
        {_id: "1", id: 1, title: "Charity1"},
        {_id: "2", id: 2, title: "Charity2"},
        {_id: "3", id: 3, title: "Charity3"},
        {_id: "4", id: 4, title: "Charity4"},
        {_id: "5", id: 5, title: "Charity5"}
    ];

    charitiesRouter.get('/', function (req, res) {
        res.send(
            {
                "charities": charities
            }
        );
    });

    charitiesRouter.get('/:id', function (req, res) {
        var id = req.params.id;

        res.send(
            {
                "charity": charities[id-1]
            }
        );
    });

    app.use('/api/charities', charitiesRouter);
};
