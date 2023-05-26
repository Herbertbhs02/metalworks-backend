const mongoose = require('mongoose')

const newWeldingSchema = new mongoose.Schema( {
    image: String,
    product: String,
    category:String,
    description:String
})
module.exports = mongoose.model("Metalworks", newWeldingSchema );