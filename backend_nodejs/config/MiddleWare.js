const jwt=require("jsonwebtoken")
const secretKey="0702"

module.exports=(req,res,next)=>{
    token=req.headers['authorization']
    console.log("Token",token);
    jwt.verify(token,secretKey,(err)=>{
        if(err){
            res.json({
                status:401,
                success:false,
                msg:"Unauthenicated user"
            })
        }
        else{
            next()
        }
    })
}