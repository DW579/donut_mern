const router = require("express").Router();
let Campaign = require("../models/campaign.model");
const ImageKit = require("imagekit");

router.route("/").get((req, res) => {
    Campaign.find()
        .then(campaigns => res.json(campaigns))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/create_image_folder").post((req, res) => {
    // Convert all non letters and numbers to _ (requirment of imagekit.io)
    const folder_name = req.body.folder_name.replace(/\W/g, "_");

    const imagekit = new ImageKit({
        publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
    });

    imagekit.createFolder({
        folderName: folder_name,
        parentFolderPath: "/"
    }, 
    function(error, result) {
        if(error) {
            console.log(error)
        }
        else {
            console.log(result)
            res.json(folder_name)
        }
    });

});

router.route("/host_image").post((req, res) => {
    const base64 = req.body.base64;
    const file_name = req.body.file_name;
    const images_folder_path = req.body.images_folder_path;

    const imagekit = new ImageKit({
        publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
    });

    imagekit.upload({
        file : base64, //required
        fileName : file_name,   //required
        folder: images_folder_path,
        useUniqueFileName: false
    }, function(error, result) {
        if(error) {
            console.log(error)
        }
        else {
            console.log(result)
            res.json(result.filePath);
        }
    });
});

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const images_folder_path = req.body.images_folder_path;
    const html = req.body.html;

    const newCampaign = new Campaign({
        name,
        images_folder_path,
        html
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