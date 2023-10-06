import express from "express";
import bodyParser from "body-parser";

//creating constants
const app = express();
const port= 4000;

//creating posts
let posts = [
    {
        id: 1,
        author: "Subhajit Dhar",
        title: "Nodejs",
        content: "A run time environment for javascript",
        type: "easy",
        date: new Date()
    }
]
let lastid = 1;

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//routing

//for all posts
app.get("/posts", (req,res)=>{
    res.json(posts);
});

//for specific post of id
app.get("/posts/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    posts.forEach(post => {
        if(post.id === id){
            // console.log(post);
            res.json(post);
        }
        else{
            res.statusCode(404);
        }
    });
});

//for filtered search
app.get("/filter",(req,res)=>{
    const type = req.query.type;
    posts.forEach(post => {
        if(post.type === type){
            console.log(post.type);
            res.json(post);
        }
        else{
           console.log("Nothing found");
           res.send("OOPS! Nothing found");
        }
    });  
});

//for posting new data
app.post("/posts",(req,res)=>{
    const newPost = {
        id : posts.length+1,
        author: req.body.author,
        title: req.body.title,
        content: req.body.content,
        type: req.body.type,
        date: new Date()
    }
    posts.push(newPost);
    res.json(newPost);
});

//for modification 
app.patch("/posts/:id",(req,res)=>{
    
   const post = posts.find((p) => p.id === parseInt(req.params.id));
   if (!post) return res.status(404).json({ message: "Post not found" });
 
   if(req.body.type) post.type = req.body.type;
   if (req.body.title) post.title = req.body.title;
   if (req.body.content) post.content = req.body.content;
   if (req.body.author) post.author = req.body.author;
 
   res.json(post);
   
});

//for deletion a specific post
app.delete("/posts/:id",(req,res)=>{
    const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});


//online of API
app.listen(port,()=>
{
    console.log(`Server hosted in ${port}`);
})