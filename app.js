const express = require('express');
const app = express();
const port = 3000;
const postsRouter = require("./routes/posts");
const commentRouter = require("./routes/comment");
const connect = require("./schemas");
connect();
app.use(express.json());
app.use("/api", [postsRouter]);
app.use("/api", [commentRouter]);

app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
  });