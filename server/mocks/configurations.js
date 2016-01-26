module.exports = function (app) {
    var express = require('express');
    var configurationsRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());

    configurationsRouter.get('/:id', function (req, res) {
        res.send(
            {
                "configuration": {
                    _id: "1",
                    id: 1,
                    weekStartDate: 1450311401,
                    currentSeason: "1",
                    currentWeekIndex: 3
                }
            }
        );
    });

    app.use('/api/configurations', configurationsRouter);
};
