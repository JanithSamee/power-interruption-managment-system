const {Schema,model} = require("mongoose")

const deviceSechema =new Schema({
    devID:{type:String,required:true,unique:true},
    location:{
        la:String,
        lo:String
    },
    region:String,
    // Officer
    lastBreakdown:{type:Date},
    isunderBreakdown:{type:Boolean,default:false},
    isActive:{type:Boolean,default:false},
    highConsumtions:{
        recordedTime:{type:Date},
        count:{type:Number,default:0}
    }
},{timestamps:true})

const Device = model("Device",deviceSechema)

module.exports =Device