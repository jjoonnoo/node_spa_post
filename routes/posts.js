const express = require("express");
const router = express.Router();
const Posts = require("../schemas/posts.js")
function get_today(){
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let second = today.getSeconds();
    let millisecond = today.getMilliseconds();
    return new Date(Date.UTC(year,month,date,hour,minute,second,millisecond))
}

//전체 목록 시간 내림차순
router.get("/posts", async (req, res) => {
	const post = await Posts.find({},{'password':false,'content':false,'__v':false})
	const SortingPosts = post.sort(function (a,b){
		return b.date - a.date
	})
	res.json({SortingPosts})
});
//게시글 작성
router.post("/posts",async(req,res)=>{
	try{
		const {user,password,title,content} = req.body
		const created_posts = await Posts.create({user,password,title,content});
		res.status(201).json({created_posts});
	}catch(err){
		res.status(400).json({result:'잘못된 요청.'})
	}
})
//user의 게시글조회
router.get("/posts/:postId/content", async (req, res) => {
	try{
		const {postId} = req.params
		const detail = await Posts.find({'_id':Object(postId)},{'_id':false,'postId':false,'password':false,'date':false,'postId':false})
		res.status(200).json({detail})
	}catch(err){
		res.status(404).json({result:'글이 존재하지 않습니다.'})
	}
	
})
//postId에서 user의 password가 일치하면 content 수정
router.put("/posts/:postId/content", async(req,res) =>{
	try{
		const {postId} = req.params;
		const {password} = req.body;
		const {content} = req.body;
		const date = get_today();
		const existsUser = await Posts.find({'_id':Object(postId)})
		const exist = await Posts.find({$and:[{'_id':Object(postId)},{'password':password}]})
		if(existsUser.length){
			if(exist.length){
				await Posts.updateOne({'_id':Object(postId)},{$set:{content}})
				await Posts.updateOne({'_id':Object(postId)},{$set:{date}})
				res.status(200).json({result:"수정 완료."})
			}
			else{
				res.status(401).json({result:'비밀번호가 틀렸습니다.'})
			}
		}
	}catch(err){
		res.status(404).json({result:"글이 없습니다."})
	}
})
//user의 password가 일치하면 삭제
router.delete("/posts/:postId/content", async (req, res) => {
	try{
		const {postId} = req.params;
		const {password} = req.body;
		const existsUser = await Posts.find({'_id':Object(postId)})
		const exist = await Posts.find({$and:[{'_id':Object(postId)},{'password':password}]})
		if(existsUser.length){
			if(exist.length){
				await Posts.deleteMany({'_id':Object(postId)})
				res.status(200).json({result:"삭제 완료."})
			}
			else{
				res.status(401).json({result:'비밀번호가 틀렸습니다.'})
			}
		}
	}catch(err){
		res.status(404).json({result:'글이 없습니다.'})
	}
});

module.exports = router;
