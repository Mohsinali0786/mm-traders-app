const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    id:String,
    name:String,
    price:Number,
    quantity:Number,
    description:'String',
    sizes:Array,
    type:String
  })
  module.exports=dataSchema
  