const User = require('../models/User');
module.exports.createRequest = async function(req,res){
   try{
    if(req.xhr){
        let user = await User.findById(req.params.id);
        user.requests.push(req.user.id);
        req.user.sentRequests.push(req.params.id)
        user.save();
        req.user.save();
        return res.json(200,{
            data : {
                deleted : "",
            },
            message : "Request Succesfull",
         })
    }
   }
   catch(err){

   }
}