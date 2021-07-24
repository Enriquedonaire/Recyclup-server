const { Schema, model } = require("mongoose");


const ReviewsSchema = new Schema({
    username: {
        type: String,
        required: true
        
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
