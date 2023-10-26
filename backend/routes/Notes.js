const express=require("express");
const router=express.Router();


//whenever a user hits /api/notes/ endpoint, rest of the code goes from below

//this single slash means after /api/notes
router.get("/",(req,res)=>{
    res.json([]);
})

module.exports=router;
