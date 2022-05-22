const Officer =require("../models/officer.model")
const auth =require("../utils/auth")

const signUp= async (req,res)=>{
    try {
        const {NIC,serviceID,email,username,password}=req.body
        const userdata ={NIC,serviceID,email,username,password}
        if(!Object.values(userdata).every(value=>value!== undefined )){
            return res.status(400).json({msg:"invalid-input",err:true,data:{}})
        }
        if(password.length<6){
            return res.status(400).json({msg:"invalid-password-length",err:true,data:{}})
            
        }
        const user = await auth.signup(Officer,userdata)
        res.json(user)
    } catch (error) {
        return res.status(500).json({msg:"error",err:true,data:error})        
    }
}
const signIn= async (req,res)=>{
    try {
        const {username,password}=req.body
        if(!username || !password){
            return res.status(400).json({msg:"invalid-input",err:true,data:{}})
        }
        if(password.length<6){
            return res.status(400).json({msg:"invalid-password-length",err:true,data:{}})           
        }
        // Officer.findOne
        const user = await auth.signin(Officer,username,password)

        if(user.msg && user.msg==="password-incorrect"){
            return res.status(401).json({msg:"invalid-password",err:true,data:{}})           
        }
        res.set({"Authorization":"Bearer "+user.accessToken})
        res.cookie("_rt","Bearer "+user.refreshToken,{httpOnly: true,expires: new Date(Date.now() + 48 * 3600000)}).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"error",err:true,data:error})        
    }
}


const getOfficer = async(req,res) => {
    try {
        res.cookie("test","123",{httpOnly: true,expires: new Date(Date.now() + 48 * 3600000)}). send("Offifer")
    } catch (error) {
        console.log(error)
    }
 }

 module.exports={getOfficer,signUp,signIn}