const { Schema, model } = require("mongoose");


const ReviewsSchema = new Schema({
    name: {
    type: String,
    },
    description: {
        type: String,
    },
    ranking: {
        type: Number,
    }
});

const Reviews = model("Item", ReviewsSchema);

module.exports = Reviews;
