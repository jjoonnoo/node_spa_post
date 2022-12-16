const express = require("express");
const router = express.Router();
const Comment = require("../schemas/comment.js")
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
//postId의 comment목록 시간 내림차순
router.get("/:postId/comment/content", async (req, res) => {
	try{
		const {postId} = req.params
		const detail = await Comment.find({'postId':String(postId)},{'_id':false,'postId':false,'password':false,'__v':false})
		const SortingDetail = detail.sort(function (a,b){
			return b.date - a.date
		})
		res.status(200).json({SortingDetail})
	}catch(err){
		res.status(404).json({result:"글이 없습니다."})
	}
})
//댓글 작성
router.post("/:postId/comment",async(req,res)=>{
	try{
		const {postId} = req.params
		const {user,password,content} = req.body
		const created_comment = await Comment.create({postId,user,password,content});
		res.status(201).json({created_comment});
	}catch(err){
		res.status(404).json({result:'글이 없습니다.'})
	}
})
//commentId에서 comment의 user의 password가 일치하면 content 수정
router.put("/comment/content/:commentId", async(req,res) =>{
	try{
		const {commentId} = req.params;
		const {password} = req.body;
		const {content} = req.body;
		const date = get_today();
		const existsUser = await Comment.find({'_id':Object(commentId)})
		const exist = await Comment.find({$and:[{'_id':Object(commentId)},{'password':password}]})
		if(existsUser.length){
			if(exist.length){
				await Comment.updateOne({'_id':Object(commentId)},{$set:{content}})
				await Comment.updateOne({'_id':Object(commentId)},{$set:{date}})
				res.status(200).json({result:'수정 완료.'})
			}
			else{
				res.status(401).json({result:'비밀번호가 틀렸습니다.'})
			}
		}
	}catch(err){
		res.status(404).json({result:'댓글이 없습니다.'})
	}
})
//user의 password가 일치하면 삭제
router.delete("/comment/content/:commentId", async (req, res) => {
	try{
		const {commentId} = req.params;
		const {password} = req.body;
		const existsUser = await Comment.find({'_id':Object(commentId)})
		const exist = await Comment.find({$and:[{'_id':Object(commentId)},{'password':password}]})
		if(existsUser.length){
			if(exist.length){
				await Comment.deleteMany({'_id':Object(commentId)})
				res.status(200).json({result:'삭제 완료.'})
			}
			else{
				res.status(401).json({result:'비밀번호가 틀렸습니다.'})
			}
		}
	}catch(err){
		res.status(404).json({result:'댓글이 없습니다.'})
	}
});

module.exports = router;