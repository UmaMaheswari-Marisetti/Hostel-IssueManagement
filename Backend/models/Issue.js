import mongoose from 'mongoose';
const issueSchema=new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String,required:true},
    status:{type:String,enum:["pending","progress","resolved"],default:"pending"},
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User',},

},{timestamps:true});
const Issue=mongoose.model("Issue",issueSchema);
export default Issue;