module.exports = function (app) {
    var express = require('express');
    var charityDonationSummariesRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());

    charityDonationSummariesRouter.get('/', function (req, res) {
        res.send(
            {
                "charity-donation-summaries": [
                    {_id: "1", id: 1, charityTitle: "Charity1", rank: 1, rawScore: 50, weekIndex: 1, weekStartDate: 1449101800000},
                    {_id: "2", id: 2, charityTitle: "Charity2", rank: 2, rawScore: 20, weekIndex: 1, weekStartDate: 1449101800000},
                    {_id: "3", id: 3, charityTitle: "Charity3", rank: 3, rawScore: 10, weekIndex: 1, weekStartDate: 1449101800000},

                    {_id: "11", id: 11, charityTitle: "Charity1", rank: 2, rawScore: 30, weekIndex: 2, weekStartDate: 1449706600000},
                    {_id: "12", id: 12, charityTitle: "Charity2", rank: 1, rawScore: 35, weekIndex: 2, weekStartDate: 1449706600000},
                    {_id: "13", id: 13, charityTitle: "Charity3", rank: 3, rawScore: 15, weekIndex: 2, weekStartDate: 1449706600000},

                    {_id: "21", id: 21, charityTitle: "Charity1", rank: 3, rawScore: 20, weekIndex: 3, weekStartDate: 1450311400000},
                    {_id: "22", id: 22, charityTitle: "Charity2", rank: 2, rawScore: 25, weekIndex: 3, weekStartDate: 1450311400000},
                    {_id: "23", id: 23, charityTitle: "Charity3", rank: 1, rawScore: 30, weekIndex: 3, weekStartDate: 1450311400000}
                ]
            }
        );
    });

    app.use('/api/charityDonationSummaries', charityDonationSummariesRouter);
};
