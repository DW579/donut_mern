const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const campaignSchema = new Schema({
    name: { type: String, required: true },
    html: { type: String, required: true },
    images: { type: Object, required: true },
    date: { type: Date, required: true }
}, {
    timestamps: true,
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;