const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DataSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    userType: { type: Number, default: 1},
    userPassword: String
},{
    timestamps: true
});

DataSchema.pre('save', function(next){
    if(!this.isModified('userPassword')) return next();
    this.userPassword = bcrypt.hashSync(this.userPassword, 10);
    next();
});

DataSchema.pre('findOneAndUpdate', function(next){
    var password = this.getUpdate().userPassword+'';
    if (password.length<55) {
        this.getUpdate().userPassword = bcrypt.hashSync(password, 10);
    };
    next();
});

DataSchema.methods.isCorrectPassword = function (password, callback){
    bcrypt.compare(password, this.userPassword, function (err, same){
        if (err) {
            callback(err);
        } else{
            callback(err, same);
        }
    })
}

const users = mongoose.model('Users', DataSchema);
module.exports = users;