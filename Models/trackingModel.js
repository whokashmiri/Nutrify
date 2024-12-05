const mongoose  = require("mongoose");
const trackingSchema = mongoose.Schema({
    foodId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'foods',
        required:true
    },
   
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    details:{
        calories:Number,
        protein:Number,
        carbohydrates:Number,
        fat:Number,
        fiber:Number,
    },
    eatenDate:{
        type:String,
        default:new Date().toLocaleDateString()
    },
    quantity:{
        type:Number,
        required:true,
        min:1

    }

},{timestamps:true})

const trackingModel = mongoose.model("trackings", trackingSchema)
module.exports = trackingModel;
