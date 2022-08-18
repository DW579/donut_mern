const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const campaignSchema = new Schema({
    name: { type: String, required: true },
    images_folder_path: { type: String, required: true },
    html: { type: String, required: true }
}, {
    timestamps: true,
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;