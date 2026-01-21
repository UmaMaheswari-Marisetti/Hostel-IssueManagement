import express from 'express'
import Issue from '../models/Issue.js'
import auth from '../middleware/auth.js'


const router=express.Router();
// Student raise issue
router.post("/", auth, async (req, res) => {
  try {
    const issue = new Issue({ ...req.body, user: req.user.id });
    await issue.save();
    res.json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});


// Student view my issues
router.get("/myIssues",auth, async(req,res)=>{
  const issues = await Issue.find({user:req.user.id});
  res.json(issues);
});

// Admin view all issues
router.get("/",auth, async(req,res)=>{
  if(req.user.role !== "admin") return res.status(403).json("Forbidden");
  const issues = await Issue.find().populate("user","name email");
  res.json(issues);
});

/* Admin: Filter By Status */
router.get("/status/:status",auth, async(req,res)=>{
  if(req.user.role!=="admin") return res.status(403).json("Forbidden");

  const valid = ["pending","progress","resolved"];
  if(!valid.includes(req.params.status)) return res.status(400).json("Invalid status");

  const issues = await Issue.find({status:req.params.status}).populate("user","name email");
  res.json(issues);
});

// Admin update status
router.put("/:id",auth, async(req,res)=>{
  if(req.user.role !== "admin") return res.status(403).json("Forbidden");
  await Issue.findByIdAndUpdate(req.params.id,{status:req.body.status});
  res.json("Updated");
});

export default router;
