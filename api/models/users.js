var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

/*
var userSchema = new mongoose.Schema({
    name: String,
    idgroup: Number,
    registeredDate: {        
        type: Date,
        "default": Date.now
    }
},{
    versionKey: false
}); 

*/
 
var userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    salt: { type: String, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
},{
    versionKey: false
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    username: this.username,
    firstName: this.firstName,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Users', userSchema);