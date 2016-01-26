module.exports = function (app) {
    var express = require('express');
    var charityDonationSummariesRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());

    charityDonationSummariesRouter.get('/', function (req, res) {
        console.log("weekIndex " + req.params.weekIndex);
        res.send(
            {
                "charity-donation-summaries": [
                    {_id: "1", id: 1, charity: "1", rank: 1, score: 50, weekIndex: 1, weekStartDate: 1449101800},
                    {_id: "2", id: 2, charity: "2", rank: 2, score: 20, weekIndex: 1, weekStartDate: 1449101800},
                    {_id: "3", id: 3, charity: "3", rank: 3, score: 10, weekIndex: 1, weekStartDate: 1449101800},

                    {_id: "11", id: 11, charity: "1", rank: 2, score: 30, weekIndex: 2, weekStartDate: 1449706600},
                    {_id: "12", id: 12, charity: "2", rank: 1, score: 35, weekIndex: 2, weekStartDate: 1449706600},
                    {_id: "13", id: 13, charity: "3", rank: 3, score: 15, weekIndex: 2, weekStartDate: 1449706600},

                    {_id: "21", id: 21, charity: "1", rank: 3, score: 20, weekIndex: 3, weekStartDate: 1450311401},
                    {_id: "22", id: 22, charity: "2", rank: 2, score: 25, weekIndex: 3, weekStartDate: 1450311401},
                    {_id: "23", id: 23, charity: "3", rank: 1, score: 30, weekIndex: 3, weekStartDate: 1450311401}
                ]
            }
        );
    });

    app.use('/api/charityDonationSummaries', charityDonationSummariesRouter);
};
