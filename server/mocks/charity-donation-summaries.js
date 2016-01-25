module.exports = function (app) {
    var express = require('express');
    var charityDonationSummariesRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());

    charityDonationSummariesRouter.get('/:id', function (req, res) {
        console.log("weekIndex " + req.params.id);
        res.send(
            {
                "charity-donation-summaries": [
                    {_id: "1", id: 1, charityId: 1, rank: 1, score: 50, weekIndex: 1},
                    {_id: "2", id: 2, charityId: 2, rank: 2, score: 20, weekIndex: 1},
                    {_id: "3", id: 3, charityId: 3, rank: 3, score: 10, weekIndex: 1},

                    {_id: "11", id: 4, charityId: 1, rank: 2, score: 30, weekIndex: 2},
                    {_id: "12", id: 5, charityId: 2, rank: 1, score: 35, weekIndex: 2},
                    {_id: "13", id: 6, charityId: 3, rank: 3, score: 15, weekIndex: 2},

                    {_id: "21", id: 7, charityId: 1, rank: 3, score: 20, weekIndex: 3},
                    {_id: "22", id: 8, charityId: 2, rank: 2, score: 25, weekIndex: 3},
                    {_id: "23", id: 9, charityId: 3, rank: 1, score: 30, weekIndex: 3}
                ]
            }
        );
    });

    app.use('/api/charity-donation-summaries', charityDonationSummariesRouter);
};
