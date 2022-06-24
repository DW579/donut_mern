const router = require("express").Router();
let Campaign = require("../models/campaign.model");

router.route("/").get((req, res) => {
    Campaign.find()
        .then(campaigns => res.json(campaigns))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const html = req.body.html;
    // const images = req.body.images;

    const newCampaign = new Campaign({
        name,
        html,
        // images
    });

    newCampaign.save()
        .then(() => res.json("Campaign added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;