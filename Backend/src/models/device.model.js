const {Schema,model} = require("mongoose")

const deviceSechema =new Schema({
    devID:{type:String,required:true,unique:true},
    location:{
        la:String,
        lo:String
    },
    region:String,
    // Officer
    lastBreakdown:{type:Date,default:Date.now},
    verified:{type:Boolean,default:false},
},{timestamps:true})

const Device = model("Device",deviceSechema)

module.exports =Device