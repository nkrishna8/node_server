const mongoose = require('mongoose');
const { errorCreator } = require('../utils/responseCreator');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username:
    {
        type: String,
        unique: true,
        required: [true, 'Username Mandatory!']
    },
    password:
    {
        type: String,
        required: [true, 'Password Mandatory!']
    },
    name:
    {
        type: String,
        required: [true, 'Fill Tour Name!']
    },
    profilePicture:
    {
        type: String,
    },
    friendList: [String]
});

userSchema.statics.createUser = async(userData) =>{
    // console.log("createUser Hit==>>");
    // return
    const data = await userModel.create(userData);
    console.log("createUser Data Here=>",data);
    return data;

}

userSchema.statics.findUser=async(username)=>{
    // const user = await userModel.findOne({username},{_id:0,_v:0})
    const user = await userModel.findOne({username},{__v:0})
    if(user){
        return user;
    }
    else{
        errorCreator('Username Not exist', 404);
    }
}

//Add Friend or Remove Friend
userSchema.statics.updateFriendList=async(username,id,addFriend=true)=>{
    let data = null;
    // console.log("updateFriendListupdateFriendList", username,id, addFriend);
    if(addFriend){
        console.log("KJHHH+++",data);
        data = await userModel.updateOne(
            { username: username },
            { $addToSet: { friendList: id } }
          );
        // console.log("KJHHH+++",data);
    }
    else{
        data = await userModel.updateOne({username},{$pull:{friendList:id}})
    }
    
    if(data.modifiedCount){
        console.log("LLLLLLLL");
        return userModel.findUser(username)
    }
}

// userSchema.static.addFriend=async(username,id)=>{
//     const data = await userModel.updateOne({username},{$addToset:{friendList:id}})
//     if(data.modifiedCount){
//         return userModel.findUser(username)
//     }
// }
// userSchema.static.removeFriend=async(username,id)=>{
//     const data = await userModel.updateOne({username},{$pull:{friendList:id}})
//     if(data.modifiedCount){
//         return userModel.findUser(username)
//     }
// }

const userModel=model('users',userSchema);

module.exports=userModel;