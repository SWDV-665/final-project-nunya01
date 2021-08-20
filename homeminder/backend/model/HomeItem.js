const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HomeItem = new Schema({
  appliance_name: {
    type: String
  },
  part_name: {
    type: String
  },
  part_number: {
    type: String
  },
  part_descr: {
    type: String
  },
  addtl_notes: {
    type: String
  },
  replc_interval: {
    type: Number
  },
  last_replc_date: {
      type: Date
  }
}, {
  collection: 'items'
})

module.exports = mongoose.model('HomeItem', HomeItem)