const {Schema,model} = require("mongoose")

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const officerSechema =new Schema({
    NIC:{type:String,required:true ,trim:true,unique:true},
    serviceID:{type:String,required:true ,trim:true,unique:true},
    verified:{type:Boolean,default:false},
    Regions:[[{type:String,trim:true}]],
    userRole:{type:String,enum:["senior","head","technician","new"],default:"new"},
    requestedRole:{type:String,enum:["senior","head","technician",]},
    refreshToken:{type:String},
    email:{type:String,required:true ,validate:[validateEmail,"email-not-valid"] ,trim:true },
    username:{type:String,required:true ,trim:true},
    passwordHash:{type:String,required:true ,trim:true},
    isDeleted:{type:Boolean,default:false}
},{timestamps:true})

const Device = model("Officer",officerSechema)

module.exports =Device