const config = require('../helpers/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var User = require('../models/users');


 module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete_user
 };

function authenticate(username, password) {
    const user = User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
    //    const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
      //  console.log(token);
        return token;
        }else{
        return "user not found";
    }  
 }
 
 async function getAll() {
    return await User.find().select('-hash');
 }

 async function getById(id) { 
     User
     .findById(req.params.id)
      .exec(function(err, data){
         if(!err){
            return data; 
         }
       });

 }

 async function create(userParam) {    
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }    
    const user = new User(userParam);
    // hash password
    if (userParam.hash) {
        user.hash = bcrypt.hashSync(userParam.hash, 10);
    }
    // save user
  //   await user.save();
       console.log("before saving");
    console.log("token before saving="+user.generateJwt());
     console.log("before saving");
     /*
    await user.save(function(err) {
    var token;
    token = user.generateJwt();
  //  res.status(200);
   // res.json({"token" : token});
        console.log(token);
  });
    */
 }

 async function update(id, userParam) {
    const user = await User.findById(id);
    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    // hash password if it was entered
    if (userParam.hash) {
        userParam.hash = bcrypt.hashSync(userParam.hash, 10);
    }
    // copy userParam properties to user
    Object.assign(user, userParam);
    await user.save();
 }

 async function delete_user(id) {
    await User.findOneAndDelete(id);
 }