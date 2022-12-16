const mongoose = require("mongoose");

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

const postsSchema = new mongoose.Schema({
    postId:{
        type: mongoose.Types.ObjectId,
    },
    user:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: get_today
    }
  });

module.exports = mongoose.model("Posts", postsSchema);