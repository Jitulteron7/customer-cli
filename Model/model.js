const mongoose =require('mongoose');

const customerSchema=new mongoose.Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    phone:{
        type: String
    },
    email:{
        type: String
    },
});


module.exports=mongoose.model("customer",customerSchema)