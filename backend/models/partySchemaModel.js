const mongoose = require("mongoose");
const { Schema } = mongoose;
const partySchemaModel = new Schema(
  {
    partyName: String,
    partyAddress: String,
    mobileNo: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("party", partySchemaModel);
