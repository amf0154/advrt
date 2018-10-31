var mongoose = require('mongoose');

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

module.exports = mongoose.model('Users', userSchema);