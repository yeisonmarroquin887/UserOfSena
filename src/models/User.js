const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Names: {
        type: String,
        required: true
    },
    Surnames: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    }
});

userSchema.methods.toJSON = function() {
    const userObject = this.toObject(); 
    delete userObject.Password;
    
    return userObject;
}

const User = mongoose.model('User', userSchema);


module.exports = User;
