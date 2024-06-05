const mongoose = require("mongoose");
const{Schema}=mongoose
const NotesSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,  //ID of User Model
        ref:"User"
    },
    title:{
        type:String,
        default:"No Title..."
    },
    description:{
        type:String,
        default:"No Description..."
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    },
})

module.exports=mongoose.model("Notes",NotesSchema);