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

    // Add campaign info to mongodb
    newCampaign.save()
        .then(() => res.json("Campaign added!"))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Campaign.findById(req.params.id)
        .then(campaign => res.json(campaign))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Campaign.findByIdAndDelete(req.params.id)
        .then(() => res.json("Campaign deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

// May not need to implement update for this app

module.exports = router;