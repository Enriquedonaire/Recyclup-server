const { Schema, model } = require("mongoose");
require('./User.model')


let PaymentSchema = new Schema({
    amount: {
      type: Number,
    },

donationId: {
  type: Schema.Types.ObjectId,
  ref: 'user'
}

})


let DonationModel = model('donation', PaymentSchema)


module.exports = DonationModel