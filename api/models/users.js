var mongoose = require('mongoose');

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
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
},{
    versionKey: false
});

userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Users', userSchema);